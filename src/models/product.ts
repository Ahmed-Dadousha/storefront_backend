import client from '../utilities/database';
import { BaseProduct, Product } from '../interfaces/product.interface';

export class ProductStore {
	//Get all products
	async index(): Promise<Product[]> {
		try {
			const conn = await client.connect();
			const sql = 'SELECT * FROM products';

			const result = await conn.query(sql);

			conn.release();

			return result.rows;
		} catch (err) {
			throw new Error(`Can not  get all products. ${err}`);
		}
	}
	//Create a new product
	async create(product: BaseProduct): Promise<Product> {
		try {
			const sql =
				'INSERT INTO products (name, price) VALUES($1, $2) RETURNING *';
			const conn = await client.connect();
			const result = await conn.query(sql, [product.name, product.price]);

			conn.release();

			return result.rows[0];
		} catch (err) {
			throw new Error(`Can not create new product ${product.name}. ${err}`);
		}
	}
	// Get a specific product
	async show(id: number): Promise<Product> {
		try {
			const sql = 'SELECT * FROM products WHERE id=($1)';
			const conn = await client.connect();
			const result = await conn.query(sql, [id]);

			conn.release();

			return result.rows[0];
		} catch (err) {
			throw new Error(`Could not find product ${id}. ${err}`);
		}
	}
	// Update a product
	async update(id: number, newData: BaseProduct): Promise<Product> {
		try {
			const sql =
				'UPDATE products SET name = $1, price = $2 WHERE id = $3 RETURNING *';
			const conn = await client.connect();
			const result = await conn.query(sql, [newData.name, newData.price, id]);

			conn.release();

			return result.rows[0];
		} catch (err) {
			throw new Error(`Can not update the product ${newData.name}. ${err}`);
		}
	}
	// delete a product (can not create a variable with name delete)
	async deleteProduct(id: number): Promise<Product> {
		try {
			const sql = 'DELETE FROM products WHERE id=($1)';
			const conn = await client.connect();
			const result = await conn.query(sql, [id]);

			conn.release();

			return result.rows[0];
		} catch (err) {
			throw new Error(`Can not delete the product ${id}. ${err}`);
		}
	}
}
