"use strict";
// import supertest from 'supertest';
// import jwt, { Secret } from 'jsonwebtoken';
// import app from '../../server';
// import { BaseAuthUser } from '../../interfaces/user.interface';
// import { BaseProduct } from '../../interfaces/product.interface';
// const request = supertest(app);
// const SECRET = process.env.TOKEN_SECRET;
// console.log(SECRET);
// describe('Product Handler', () => {
// 	const product: BaseProduct = {
// 		name: 'msi modern 14',
// 		price: 10000,
// 	};
// 	let token: string, userId: number, productId: number;
// 	beforeAll(async () => {
// 		const userData: BaseAuthUser = {
// 			username: 'marco',
// 			firstname: 'mikasa',
// 			lastname: 'akraman',
// 			password: 'pass1',
// 		};
// 		const { body } = await request.post('/users/create').send(userData);
// 		token = body;
// 		// @ts-ignore
// 		const { user } = jwt.verify(token.toString(), SECRET);
// 		userId = user.id;
// 	});
// 	afterAll(async () => {
// 		await request
// 			.delete(`/users/${userId}`)
// 			.set('Authorization', 'bearer ' + token);
// 	});
// 	it('gets the create endpoint', (done) => {
// 		request
// 			.post('/products/create')
// 			.send(product)
// 			.set('Authorization', 'bearer ' + token)
// 			.then((res) => {
// 				const { body, status } = res;
// 				expect(status).toBe(200);
// 				productId = body.id;
// 				done();
// 			});
// 	});
// 	it('gets the index endpoint', (done) => {
// 		request.get('/products').then((res) => {
// 			expect(res.status).toBe(200);
// 			done();
// 		});
// 	});
// 	it('gets the read endpoint', (done) => {
// 		request.get(`/products/${productId}`).then((res) => {
// 			expect(res.status).toBe(200);
// 			done();
// 		});
// 	});
// 	it('gets the update endpoint', (done) => {
// 		const newProductData: BaseProduct = {
// 			...product,
// 			name: 'CodeMerge 156 A',
// 			price: 1299,
// 		};
// 		request
// 			.put(`/products/${productId}`)
// 			.send(newProductData)
// 			.set('Authorization', 'bearer ' + token)
// 			.then((res) => {
// 				expect(res.status).toBe(200);
// 				done();
// 			});
// 	});
// 	it('gets the delete endpoint', (done) => {
// 		request
// 			.delete(`/products/${productId}`)
// 			.set('Authorization', 'bearer ' + token)
// 			.then((res) => {
// 				expect(res.status).toBe(200);
// 				done();
// 			});
// 	});
// });
