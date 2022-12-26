import { OrderStore } from '../../models/order';
import { UserStore } from '../../models/user';
import { ProductStore } from '../../models/product';
import { BaseOrder, Order } from '../../interfaces/order.interface';
import { User } from '../../interfaces/user.interface';
import { Product } from '../../interfaces/product.interface';
import client from '../../utilities/database';

const order_store = new OrderStore();

describe('Order Model', () => {
	const user_store = new UserStore();
	const product_store = new ProductStore();

	let order: BaseOrder, user_id: number, product_id: number;

	const createOrder = (order: BaseOrder) => {
		return order_store.create(order);
	};

	const deleteOrder = (id: number) => {
		return order_store.deleteOrder(id);
	};

	beforeAll(async () => {
		const user: User = await user_store.create({
			username: 'mahmoudAali',
			firstname: 'mahmoud',
			lastname: 'ali',
			password: 'password7777',
		});

		user_id = user.id;

		const product: Product = await product_store.create({
			name: 'test product',
			price: 200,
		});

		product_id = product.id;

		order = {
			products: [
				{
					product_id,
					quantity: 10,
				},
			],
			user_id,
			status: true,
		};
	});

	afterAll(async () => {
		await user_store.deleteUser(user_id);
		await product_store.deleteProduct(product_id);

		const conn = await client.connect();
		const sql: string =
			'DELETE FROM users;\n ALTER SEQUENCE users_id_seq RESTART WITH 1;\n DELETE FROM products;\n ALTER SEQUENCE products_id_seq RESTART WITH 1;\n DELETE FROM orders;\nALTER SEQUENCE orders_id_seq RESTART WITH 1;\n';
		await conn.query(sql);
		conn.release();
	});

	it('should have an index method', () => {
		expect(order_store.index).toBeDefined();
	});

	it('should have a show method', () => {
		expect(order_store.show).toBeDefined();
	});

	it('should have a add method', () => {
		expect(order_store.create).toBeDefined();
	});

	it('should have a delete method', () => {
		expect(order_store.deleteOrder).toBeDefined();
	});

	it('should create an order', async () => {
		const createdOrder: Order = await createOrder(order);

		expect(createdOrder).toEqual({
			id: createdOrder.id,
			...order,
		});

		await deleteOrder(createdOrder.id);
	});

	it('should return a list of orders', async () => {
		const createdOrder: Order = await createOrder(order);
		const orderList = await order_store.index();

		expect(orderList).toBeDefined();

		await deleteOrder(createdOrder.id);
	});

	it('should return the correct orders', async () => {
		const createdOrder: Order = await createOrder(order);
		const returnedOrder = await order_store.show(createdOrder.id);

		expect(returnedOrder).toEqual(createdOrder);

		await deleteOrder(createdOrder.id);
	});

	it('should update the order', async () => {
		const createdOrder: Order = await createOrder(order);
		const newData: BaseOrder = {
			products: [
				{
					product_id,
					quantity: 500,
				},
			],
			user_id,
			status: false,
		};

		const result = await order_store.update(createdOrder.id, newData);

		expect(result.products).toEqual(newData.products);
		expect(result.status).toEqual(newData.status);

		await deleteOrder(createdOrder.id);
	});

	it('should remove the order', async () => {
		const createdOrder: Order = await createOrder(order);

		await deleteOrder(createdOrder.id);

		const Allorders = await order_store.index();

		expect(Allorders).toEqual([]);
	});
});
