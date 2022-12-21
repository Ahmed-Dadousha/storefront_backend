import { Application, Request, Response } from 'express';
import { OrderStore } from '../models/order';
import { AuthHeader } from './authentication';
import { Order } from '../interfaces/order.interface';
import { OrderProduct } from '../interfaces/order.interface';

const order_store = new OrderStore();

const index = async (req: Request, res: Response) => {
	try {
		const orders: Order[] = await order_store.index();

		res.json(orders);
	} catch (e) {
		res.status(400);
		res.json(e);
	}
};

const create = async (req: Request, res: Response) => {
	try {
		let products = req.body.products as unknown as OrderProduct[];
		const status = req.body.status as unknown as boolean;
		const user_id = req.body.user_id as unknown as number;

		if (
			products === undefined ||
			status === undefined ||
			user_id === undefined
		) {
			res.status(400);
			res.send('parameters are  :products, :status, :user_id missing');
			return false;
		}

		const order: Order = await order_store.create({
			products,
			status,
			user_id,
		});

		res.json(order);
	} catch (e) {
		res.status(400);
		res.json(e);
	}
};

const show = async (req: Request, res: Response) => {
	try {
		const id = req.params.id as unknown as number;

		if (id === undefined) {
			res.status(400);
			res.send('missing  parameter id');
			return false;
		}

		const order: Order = await order_store.show(id);

		res.json(order);
	} catch (e) {
		res.status(400);
		res.json(e);
	}
};

const update = async (req: Request, res: Response) => {
	try {
		const id = req.params.id as unknown as number;
		let products = req.body.products as unknown as OrderProduct[];
		const status = req.body.status as unknown as boolean;
		const user_id = req.body.user_id as unknown as number;

		if (
			products === undefined ||
			status === undefined ||
			user_id === undefined ||
			id === undefined
		) {
			res.status(400);
			res.send(
				'Some required parameters are missing! eg. :products, :status, :user_id, :id'
			);
			return false;
		}

		const order: Order = await order_store.update(id, {
			products,
			status,
			user_id,
		});

		res.json(order);
	} catch (e) {
		res.status(400);
		res.json(e);
	}
};

const deleteOrder = async (req: Request, res: Response) => {
	try {
		const id = req.params.id as unknown as number;

		if (id === undefined) {
			res.status(400);
			res.send('Missing required parameter :id.');
			return false;
		}

		await order_store.deleteOrder(id);

		res.send(`Order with id ${id} successfully deleted.`);
	} catch (e) {
		res.status(400);
		res.json(e);
	}
};

export default function orderRoutes(app: Application) {
	app.get('/orders', AuthHeader, index);
	app.post('/orders/create', AuthHeader, create);
	app.get('/orders/:id', AuthHeader, show);
	app.put('/orders/:id', AuthHeader, update);
	app.delete('/orders/:id', AuthHeader, deleteOrder);
}
