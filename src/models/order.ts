import client from '../utilities/database';
import { BaseOrder, Order } from '../interfaces/order.interface';

export class OrderStore {
	// Show all orders
	async index(): Promise<Order[]> {
		try {
			const conn = await client.connect();
			const sql = 'SELECT * FROM orders';

			const result1 = await conn.query(sql);

			const orderProductsquery =
				'SELECT product_id, quantity FROM order_products WHERE order_id=($1)';
			const orders = [];

			for (const order of result1.rows) {
				const result2 = await conn.query(orderProductsquery, [order.id]);
				orders.push({
					...order,
					products: result2.rows,
				});
			}

			conn.release();

			return orders;
		} catch (err) {
			throw new Error(`Can not get all orders. ${err}`);
		}
	}
	// Create a new order
	async create(order: BaseOrder): Promise<Order> {
		try {
			const sql =
				'INSERT INTO orders (user_id, status) VALUES($1, $2) RETURNING *';
			const connection = await client.connect();
			const result1 = await connection.query(sql, [
				order.user_id,
				order.status,
			]);

			const orderProductsQuery =
				'INSERT INTO order_products (order_id, product_id, quantity) VALUES($1, $2, $3) RETURNING product_id, quantity';
			const orderProducts = [];

			for (const product of order.products) {
				const result2 = await connection.query(orderProductsQuery, [
					result1.rows[0].id,
					product.product_id,
					product.quantity,
				]);
				orderProducts.push(result2.rows[0]);
			}

			connection.release();

			return {
				...result1.rows[0],
				products: orderProducts,
			};
		} catch (err) {
			throw new Error(
				`Can not add new order for user ${order.user_id}. ${err}`
			);
		}
	}
	// Show a spacific order
	async show(id: number): Promise<Order> {
		try {
			const sql = 'SELECT * FROM orders WHERE id=($1)';
			const conn = await client.connect();
			const result1 = await conn.query(sql, [id]);
			const order = result1.rows[0];

			const orderProductsQuery =
				'SELECT product_id, quantity FROM order_products WHERE order_id=($1)';
			const result2 = await conn.query(orderProductsQuery, [id]);

			conn.release();

			return {
				...order,
				products: result2.rows,
			};
		} catch (err) {
			throw new Error(`Could not find order ${id}. ${err}`);
		}
	}
	// update an order
	async update(id: number, newData: BaseOrder): Promise<Order> {
		try {
			const sql = 'UPDATE orders SET status = $1 WHERE id = $2 RETURNING *';
			const conn = await client.connect();
			const result1 = await conn.query(sql, [newData.status, id]);

			const orderProductsQuery =
				'UPDATE order_products SET product_id = $1, quantity = $2 WHERE order_id = $3 RETURNING product_id, quantity';
			const orderProducts = [];

			for (const product of newData.products) {
				const result2 = await conn.query(orderProductsQuery, [
					product.product_id,
					product.quantity,
					result1.rows[0].id,
				]);
				orderProducts.push(result2.rows[0]);
			}

			conn.release();

			return {
				...result1.rows[0],
				products: orderProducts,
			};
		} catch (err) {
			throw new Error(
				`Can not update order for user ${newData.user_id}. ${err}`
			);
		}
	}
	// Delete a user
	async deleteOrder(id: number): Promise<Order> {
		try {
			const conn = await client.connect();
			const orderProductsSql = 'DELETE FROM order_products WHERE order_id=($1)';
			await conn.query(orderProductsSql, [id]);

			const sql = 'DELETE FROM orders WHERE id=($1)';
			const result2 = await conn.query(sql, [id]);
			const order = result2.rows[0];

			conn.release();

			return order;
		} catch (err) {
			throw new Error(`Could not delete order ${id}. ${err}`);
		}
	}
}
