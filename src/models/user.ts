import bcrypt from 'bcrypt';
import client from '../utilities/database';
import { User, BaseUser, BaseAuthUser } from '../interfaces/user.interface';

export class UserStore {
	// return all data in users table
	async index(): Promise<User[]> {
		try {
			const conn = await client.connect();
			const sql = 'SELECT * FROM users';

			const result = await conn.query(sql);

			conn.release();

			return result.rows;
		} catch (err) {
			throw new Error(`Can not users  users. ${err}`);
		}
	}
	// create a new user and return it
	async create(user: BaseAuthUser): Promise<User> {
		try {
			const sql =
				'INSERT INTO users (firstname, lastname, username, password_digest) VALUES($1, $2, $3, $4) RETURNING *';
			const hash = bcrypt.hashSync(
				user.password + process.env.BCRYPT_PASSWORD,
				parseInt(process.env.SALT_ROUNDS as string, 10)
			);
			const connection = await client.connect();
			const result = await connection.query(sql, [
				user.firstname,
				user.lastname,
				user.username,
				hash,
			]);

			connection.release();

			return result.rows[0];
		} catch (err) {
			throw new Error(
				`Can not add  a new user ${user.firstname} ${user.lastname}. ${err}`
			);
		}
	}
	// return a spacific user data
	async show(id: number): Promise<User> {
		try {
			const sql = 'SELECT * FROM users WHERE id=($1)';
			const conn = await client.connect();
			const result = await conn.query(sql, [id]);

			conn.release();

			return result.rows[0];
		} catch (err) {
			throw new Error(`Can not find the user ${id}. ${err}`);
		}
	}
	// update a user information
	async update(id: number, newData: BaseUser): Promise<User> {
		try {
			const sql =
				'UPDATE users SET firstname = $1, lastname = $2 WHERE id = $3 RETURNING *';
			const conn = await client.connect();
			const result = await conn.query(sql, [
				newData.firstname,
				newData.lastname,
				id,
			]);

			conn.release();

			return result.rows[0];
		} catch (err) {
			throw new Error(
				`Can not update the user ${newData.firstname} ${newData.lastname}. ${err}`
			);
		}
	}
	// delete a user from users table
	async deleteUser(id: number): Promise<boolean> {
		try {
			const sql = 'DELETE FROM users WHERE id=($1)';
			const conn = await client.connect();

			await conn.query(sql, [id]);

			conn.release();

			return true;
		} catch (err) {
			throw new Error(`Can not delete user ${id}. ${err}`);
		}
	}
	// check if a user is exist in users table
	async authenticate(username: string, password: string): Promise<User | null> {
		try {
			const sql = 'SELECT * FROM users WHERE username=($1)';
			const connection = await client.connect();
			const result = await connection.query(sql, [username]);

			if (result.rows[0].length) {
				const user = result.rows[0];

				if (
					bcrypt.compareSync(
						password + process.env.BCRYPT_PASSWORD,
						user.password_digest
					)
				) {
					return user;
				}
			}

			connection.release();

			return null;
		} catch (err) {
			throw new Error(`Can not find user ${username}. ${err}`);
		}
	}
}
