import { Application, Request, Response } from 'express';
import { UserStore } from '../models/user';
import { User } from '../interfaces/user.interface';
import { AuthHeader, getTokenByUser } from './authentication';

const UserStoreInstance = new UserStore();

const index = async (req: Request, res: Response) => {
	try {
		const users: User[] = await UserStoreInstance.index();

		res.json(users);
	} catch (e) {
		res.status(400);
		res.json(e);
	}
};

const create = async (req: Request, res: Response) => {
	try {
		const firstname = req.body.firstname as unknown as string;
		const lastname = req.body.lastname as unknown as string;
		const username = req.body.username as unknown as string;
		const password = req.body.password as unknown as string;

		if (
			firstname === undefined ||
			lastname === undefined ||
			username === undefined ||
			password === undefined
		) {
			res.status(400);
			res.send(
				'Some required parameters are missing! eg. :firstname, :lastname, :username, :password'
			);
			return false;
		}

		const user: User = await UserStoreInstance.create({
			firstname,
			lastname,
			username,
			password,
		});

		res.json(getTokenByUser(user));
	} catch (e) {
		res.status(400);
		res.json(e);
	}
};

const read = async (req: Request, res: Response) => {
	try {
		const id = req.params.id as unknown as number;

		if (id === undefined) {
			res.status(400);
			res.send('Missing required parameter :id.');
			return false;
		}

		const user: User = await UserStoreInstance.show(id);

		res.json(user);
	} catch (e) {
		res.status(400);
		res.json(e);
	}
};

const update = async (req: Request, res: Response) => {
	try {
		const id = req.params.id as unknown as number;
		const firstname = req.body.firstname as unknown as string;
		const lastname = req.body.lastname as unknown as string;

		if (firstname === undefined || lastname === undefined || id === undefined) {
			res.status(400);
			res.send(
				'Some required parameters are missing! eg. :firstname, :lastname, :id'
			);
			return false;
		}

		const user: User = await UserStoreInstance.update(id, {
			firstname,
			lastname,
		});

		res.json(user);
	} catch (e) {
		res.status(400);
		res.json(e);
	}
};

const deleteUser = async (req: Request, res: Response) => {
	try {
		const id = req.params.id as unknown as number;

		if (id === undefined) {
			res.status(400);
			res.send('Missing required parameter :id.');
			return false;
		}

		await UserStoreInstance.deleteUser(id);

		res.send(`User with id ${id} successfully deleted.`);
	} catch (e) {
		res.status(400);
		res.json(e);
	}
};

const authenticate = async (req: Request, res: Response) => {
	try {
		const username = req.body.username as unknown as string;
		const password = req.body.password as unknown as string;

		if (username === undefined || password === undefined) {
			res.status(400);
			res.send(
				'Some required parameters are missing! eg. :username, :password'
			);
			return false;
		}

		const user: User | null = await UserStoreInstance.authenticate(
			username,
			password
		);

		if (user === null) {
			res.status(401);
			res.send(`Wrong password for user ${username}.`);

			return false;
		}

		res.json(getTokenByUser(user));
	} catch (e) {
		res.status(400);
		res.json(e);
	}
};

export default function userRoutes(app: Application) {
	app.get('/users', AuthHeader, index);
	app.post('/users/create', create);
	app.get('/users/:id', AuthHeader, read);
	app.put('/users/:id', AuthHeader, update);
	app.delete('/users/:id', AuthHeader, deleteUser);
	app.post('/users/auth', authenticate);
}
