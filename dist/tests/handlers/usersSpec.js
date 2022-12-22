"use strict";
// import supertest from 'supertest';
// import jwt, { Secret } from 'jsonwebtoken';
// import app from '../../server';
// import { BaseAuthUser } from '../../interfaces/user.interface';
// const request = supertest(app);
// const SECRET = process.env.SECRET_TOKEN as Secret;
// describe('User Handler', () => {
// 	const userData: BaseAuthUser = {
// 		username: 'erenyeager',
// 		firstname: 'eren',
// 		lastname: 'yeager',
// 		password: 'password5555',
// 	};
// 	let token: string = 'iamgroot',
// 		userId: number = 1;
// 	it('should require authorization on every endpoint', async (done) => {
// 		await request.get('/users').then((res) => {
// 			expect(res.status).toBe(401);
// 			done();
// 		});
// 		await request.get(`/users/${userId}`).then((res) => {
// 			expect(res.status).toBe(401);
// 			done();
// 		});
// 		await request
// 			.put(`/users/${userId}`)
// 			.send({
// 				firstName: userData.firstname + 'test',
// 				lastName: userData.lastname + 'test',
// 			})
// 			.then((res) => {
// 				expect(res.status).toBe(401);
// 				done();
// 			});
// 		await request.delete(`/users/${userId}`).then((res) => {
// 			expect(res.status).toBe(401);
// 			done();
// 		});
// 	});
// 	it('gets the create endpoint', async (done) => {
// 		await request
// 			.post('/users/create')
// 			.send(userData)
// 			.then((res) => {
// 				const { body, status } = res;
// 				token = body;
// 				// @ts-ignore
// 				const { user } = jwt.verify(token.toString(), SECRET);
// 				userId = user.id;
// 				expect(status).toBe(200);
// 				done();
// 			});
// 	});
// it('gets the index endpoint', async (done) => {
// 	const response = await request
// 		.get('/users')
// 		.set('Authorization', 'bearer ' + token);
// 	expect(response.status).toBe(200);
// 	done();
// });
// it('gets the index endpoint', (done) => {
// 	request
// 		.get('/users')
// 		.set('Authorization', 'bearer ' + token)
// 		.then((res) => {
// 			expect(res.status).toBe(200);
// 			done();
// 		});
// });
// it('gets the read endpoint', (done) => {
// 	request
// 		.get(`/users/${userId}`)
// 		.set('Authorization', 'bearer ' + token)
// 		.then((res) => {
// 			expect(res.status).toBe(200);
// 			done();
// 		});
// });
// 	// 	it('gets the update endpoint', (done) => {
// 	// 		const newUserData: BaseAuthUser = {
// 	// 			...userData,
// 	// 			firstname: 'Lorenz',
// 	// 			lastname: 'Meier',
// 	// 		};
// 	// 		request
// 	// 			.put(`/users/${userId}`)
// 	// 			.send(newUserData)
// 	// 			.set('Authorization', 'bearer ' + token)
// 	// 			.then((res) => {
// 	// 				expect(res.status).toBe(200);
// 	// 				done();
// 	// 			});
// 	// 	});
// 	// 	it('gets the auth endpoint', (done) => {
// 	// 		request
// 	// 			.post('/users/auth')
// 	// 			.send({
// 	// 				username: userData.username,
// 	// 				password: userData.password,
// 	// 			})
// 	// 			.set('Authorization', 'bearer ' + token)
// 	// 			.then((res) => {
// 	// 				expect(res.status).toBe(200);
// 	// 				done();
// 	// 			});
// 	// 	});
// 	// 	it('gets the auth endpoint with wrong password', (done) => {
// 	// 		request
// 	// 			.post('/users/auth')
// 	// 			.send({
// 	// 				username: userData.username,
// 	// 				password: 'wrongpw',
// 	// 			})
// 	// 			.set('Authorization', 'bearer ' + token)
// 	// 			.then((res) => {
// 	// 				expect(res.status).toBe(401);
// 	// 				done();
// 	// 			});
// 	// 	});
// 	// 	it('gets the delete endpoint', (done) => {
// 	// 		request
// 	// 			.delete(`/users/${userId}`)
// 	// 			.set('Authorization', 'bearer ' + token)
// 	// 			.then((res) => {
// 	// 				expect(res.status).toBe(200);
// 	// 				done();
// 	// 			});
// 	// 	});
// });
// import supertest from 'supertest';
// import jwt, { Secret } from 'jsonwebtoken';
// import { BaseAuthUser } from '../../interfaces/user.interface';
// import app from '../../server';
// const request = supertest(app);
// const SECRET = process.env.TOKEN_KEY as Secret;
// describe('User Handler', () => {
// 	const userData: BaseAuthUser = {
// 		username: 'ChrisAnne',
// 		firstname: 'Chris',
// 		lastname: 'Anne',
// 		password: 'password123',
// 	};
// 	let token: Secret = SECRET,
// 		userId = 1;
// it('should gets the create endpoint', async (done) => {
// 	const res = await request.post('/users/create').send(userData);
// 	const { body, status } = res;
// 	token = body;
// 	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// 	// @ts-ignore
// 	const { user } = jwt.verify(token, SECRET);
// 	userId = user.id;
// 	expect(status).toBe(200);
// 	done();
// });
// it('should gets the index endpoint', async (done) => {
// 	const res = await request
// 		.get('/users')
// 		.set('Authorization', 'bearer ' + token);
// 	expect(res.status).toBe(200);
// 	done();
// });
// it('should get the read endpoint', async (done) => {
// 	const res = await request
// 		.get(`/users/${userId}`)
// 		.set('Authorization', 'bearer ' + token);
// 	expect(res.status).toBe(200);
// 	done();
// });
// it('should get the update endpoint', async (done) => {
// 	const newUserData: BaseAuthUser = {
// 		...userData,
// 		firstname: 'Chris',
// 		lastname: 'Anne',
// 	};
// 	const res = await request
// 		.put(`/users/${userId}`)
// 		.send(newUserData)
// 		.set('Authorization', 'bearer ' + token);
// 	expect(res.status).toBe(200);
// 	done();
// });
// it('should get the auth endpoint', async (done) => {
// 	const res = await request
// 		.post('/users/authenticate')
// 		.send({
// 			username: userData.username,
// 			password: userData.password,
// 		})
// 		.set('Authorization', 'bearer ' + token);
// 	expect(res.status).toBe(200);
// 	done();
// });
// it('should get the auth endpoint with wrong password', async (done) => {
// 	const res = await request
// 		.post('/users/authenticate')
// 		.send({
// 			username: userData.username,
// 			password: 'trtdtxcfcf',
// 		})
// 		.set('Authorization', 'bearer ' + token);
// 	expect(res.status).toBe(401);
// 	done();
// });
// it('should get the delete endpoint', async (done) => {
// 	const res = await request
// 		.delete(`/users/${userId}`)
// 		.set('Authorization', 'bearer ' + token);
// 	expect(res.status).toBe(200);
// 	done();
// });
// });
