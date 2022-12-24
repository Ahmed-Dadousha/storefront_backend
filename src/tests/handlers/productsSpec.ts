import supertest from 'supertest';
import jwt, { Secret } from 'jsonwebtoken';

import app from '../../server';
import { BaseAuthUser } from '../../interfaces/user.interface';
import { BaseProduct } from '../../interfaces/product.interface';
const request = supertest(app);
const SECRET = process.env.SECRET_TOKEN;

describe('Product Handler', () => {
	const product: BaseProduct = {
		name: 'msi modern 14',
		price: 10000,
	};

	let token: string, userId: number, productId: number;

	beforeAll(async () => {
		const userData: BaseAuthUser = {
			username: 'marco',
			firstname: 'mikasa',
			lastname: 'akraman',
			password: 'pass1',
		};

		const { body } = await request.post('/api/users/create').send(userData);

		token = body;

		// @ts-ignore
		const { user } = jwt.verify(token.toString(), SECRET);
		userId = user.id;
	});

	afterAll(async () => {
		await request
			.delete(`/api/users/${userId}`)
			.set('Authorization', 'bearer ' + token);
	});

	it('gets the create endpoint', async (done) => {
		await request
			.post('/api/products/create')
			.send(product)
			.set('Authorization', 'bearer ' + token)
			.then((res) => {
				const { body, status } = res;

				expect(status).toBe(200);

				productId = body.id;

				done();
			});
	});

	it('gets the index endpoint', async (done) => {
		await request.get('/api/products').then((res) => {
			expect(res.status).toBe(200);
			done();
		});
	});

	it('gets the read endpoint', async (done) => {
		await request.get(`/api/products/${productId}`).then((res) => {
			expect(res.status).toBe(200);
			done();
		});
	});

	it('gets the update endpoint', async (done) => {
		const newProductData: BaseProduct = {
			...product,
			name: 'samsung s22',
			price: 50000,
		};

		await request
			.put(`/api/products/${productId}`)
			.send(newProductData)
			.set('Authorization', 'bearer ' + token)
			.then((res) => {
				expect(res.status).toBe(200);
				done();
			});
	});

	it('gets the delete endpoint', async (done) => {
		await request
			.delete(`/api/products/${productId}`)
			.set('Authorization', 'bearer ' + token)
			.then((res) => {
				expect(res.status).toBe(200);
				done();
			});
	});
});
