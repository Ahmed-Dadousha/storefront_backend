import { Application, Request, Response } from 'express';
import { ProductStore } from '../models/product';
import { AuthHeader } from './authentication';
import { Product } from '../interfaces/product.interface';

const product_store = new ProductStore();

const index = async (req: Request, res: Response) => {
	try {
		const products: Product[] = await product_store.index();

		res.json(products);
	} catch (err) {
		res.status(400);
		res.json(err);
	}
};

const create = async (req: Request, res: Response) => {
	try {
		const name = req.body.name as unknown as string;
		const price = req.body.price as unknown as number;

		if (
			(req.body.name as unknown as string) === undefined ||
			(req.body.price as unknown as number) === undefined
		) {
			res.status(400);
			res.send(' some parameters are missing');
			return false;
		}

		const product: Product = await product_store.create({ name, price });

		res.json(product);
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
			res.send(' parameter :id. is missing');
			return false;
		}

		const product: Product = await product_store.show(id);

		res.json(product);
	} catch (e) {
		res.status(400);
		res.json(e);
	}
};

const update = async (req: Request, res: Response) => {
	try {
		const id = req.params.id as unknown as number;
		const name = req.body.name as unknown as string;
		const price = req.body.price as unknown as number;

		if (name === undefined || price === undefined || id === undefined) {
			res.status(400);
			res.send(' parameters  eg. :name, :price, :id is missing');
			return false;
		}

		const product: Product = await product_store.update(id, {
			name,
			price,
		});

		res.json(product);
	} catch (e) {
		res.status(400);
		res.json(e);
	}
};

const deleteP = async (req: Request, res: Response) => {
	try {
		const id = req.params.id as unknown as number;

		if (id === undefined) {
			res.status(400);
			res.send('parameter :id. is missing');
			return false;
		}

		await product_store.deleteProduct(id);

		res.send(`Product with id ${id} successfully deleted.`);
	} catch (e) {
		res.status(400);
		res.json(e);
	}
};

export default function productRoutes(app: Application) {
	app.get('/products', index);
	app.post('/products/create', AuthHeader, create);
	app.get('/products/:id', show);
	app.put('/products/:id', AuthHeader, update);
	app.delete('/products/:id', AuthHeader, deleteP);
}
