import supertest from 'supertest';
import jwt, { Secret } from 'jsonwebtoken';

import app from '../../server';
import { BaseOrder } from '../../interfaces/order.interface';
import { BaseAuthUser } from '../../interfaces/user.interface';
import { BaseProduct } from '../../interfaces/product.interface';
import client from '../../utilities/database';

const request = supertest(app);
const SECRET = process.env.SECRET_TOKEN as Secret;

describe('Order Handler', () => {
	let token: string,
		order: BaseOrder,
		user_id: number,
		product_id: number,
		order_id: number;

	beforeAll(async () => {
		const userData: BaseAuthUser = {
			username: 'amir',
			firstname: 'ali',
			lastname: 'tarek',
			password: 'sddf12',
		};
		const productData: BaseProduct = {
			name: 'T-shirt',
			price: 100,
		};

		const { body: userBody } = await request
			.post('/api/users/create')
			.send(userData);

		token = userBody;

		// @ts-ignore
		const { user } = jwt.verify(token, SECRET);
		user_id = user.id;

		const { body: productBody } = await request
			.post('/api/products/create')
			.set('Authorization', 'bearer ' + token)
			.send(productData);
		product_id = productBody.id;

		order = {
			products: [
				{
					product_id,
					quantity: 2,
				},
			],
			user_id,
			status: true,
		};
	});

	afterAll(async () => {
		await request
			.delete(`/api/users/${user_id}`)
			.set('Authorization', 'bearer ' + token);
		await request
			.delete(`/api/products/${product_id}`)
			.set('Authorization', 'bearer ' + token);
		const conn = await client.connect();
		const sql: string =
			'DELETE FROM users;\n ALTER SEQUENCE users_id_seq RESTART WITH 1;\n DELETE FROM products;\n ALTER SEQUENCE products_id_seq RESTART WITH 1;\n DELETE FROM orders;\nALTER SEQUENCE orders_id_seq RESTART WITH 1;\n';
		await conn.query(sql);
		conn.release();
	});

	it('gets the create endpoint', async (done) => {
		await request
			.post('/api/orders/create')
			.send(order)
			.set('Authorization', 'bearer ' + token)
			.then((res) => {
				const { body, status } = res;

				expect(status).toBe(200);

				order_id = body.id;

				done();
			});
	});

	it('gets the index endpoint', async (done) => {
		await request
			.get('/api/orders')
			.set('Authorization', 'bearer ' + token)
			.then((res) => {
				expect(res.status).toBe(200);
				done();
			});
	});

	it('gets the read endpoint', async (done) => {
		await request
			.get(`/api/orders/${order_id}`)
			.set('Authorization', 'bearer ' + token)
			.then((res) => {
				expect(res.status).toBe(200);
				done();
			});
	});

	it('gets the update endpoint', async (done) => {
		const newOrder: BaseOrder = {
			...order,
			status: false,
		};

		await request
			.put(`/api/orders/${order_id}`)
			.send(newOrder)
			.set('Authorization', 'bearer ' + token)
			.then((res) => {
				expect(res.status).toBe(200);
				done();
			});
	});

	it('gets the delete endpoint', async (done) => {
		await request
			.delete(`/api/orders/${order_id}`)
			.set('Authorization', 'bearer ' + token)
			.then((res) => {
				expect(res.status).toBe(200);
				done();
			});
	});
});
