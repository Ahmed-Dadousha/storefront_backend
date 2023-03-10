import supertest from 'supertest';
import jwt, { Secret } from 'jsonwebtoken';

import app from '../../server';
import { BaseAuthUser } from '../../interfaces/user.interface';

const request = supertest(app);
const SECRET = process.env.SECRET_TOKEN as Secret;

describe('User Handler', () => {
	const userData: BaseAuthUser = {
		username: 'erenyeager',
		firstname: 'eren',
		lastname: 'yeager',
		password: 'password5555',
	};

	let token: string,
		userId: number = 1;

	it('gets the  create endpoint', (done) => {
		request
			.post('/api/users/create')
			.send(userData)
			.then((res) => {
				const { body, status } = res;
				token = body;

				// @ts-ignore
				const { user } = jwt.verify(token, SECRET);
				userId = user.id;

				expect(status).toBe(200);
				done();
			});
	});

	it('gets the index endpoint', async (done) => {
		const response = await request
			.get('/api/users')
			.set('Authorization', 'bearer ' + token);
		expect(response.status).toBe(200);
		done();
	});
	it('gets the read endpoint', (done) => {
		request
			.get(`/api/users/${userId}`)
			.set('Authorization', 'bearer ' + token)
			.then((res) => {
				expect(res.status).toBe(200);
				done();
			});
	});

	it('gets the update endpoint', (done) => {
		const newUserData: BaseAuthUser = {
			...userData,
			firstname: 'maged',
			lastname: 'ali',
		};

		request
			.put(`/api/users/${userId}`)
			.send(newUserData)
			.set('Authorization', 'bearer ' + token)
			.then((res) => {
				expect(res.status).toBe(200);
				done();
			});
	});

	it('gets the auth endpoint', (done) => {
		request
			.post('/api/users/auth')
			.send({
				username: userData.username,
				password: userData.password,
			})
			.set('Authorization', 'bearer ' + token.toString())
			.then((res) => {
				expect(res.status).toBe(200);
				done();
			});
	});

	it('gets the auth endpoint with wrong password', (done) => {
		request
			.post('/api/users/auth')
			.send({
				username: userData.username,
				password: 'asfdf123',
			})
			.set('Authorization', 'bearer ' + token.toString())
			.then((res) => {
				expect(res.status).toBe(401);
				done();
			});
	});

	it('gets the delete endpoint', (done) => {
		request
			.delete(`/api/users/${userId}`)
			.set('Authorization', 'bearer ' + token)
			.then((res) => {
				expect(res.status).toBe(200);
				done();
			});
	});
});
