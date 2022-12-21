import { ProductStore } from '../../models/product';
import { BaseProduct, Product } from '../../interfaces/product.interface';
const product_store = new ProductStore();

describe('Product Model', () => {
	const product: BaseProduct = {
		name: 'lenovo legion five',
		price: 30000,
	};

	const createProduct = (product: BaseProduct) => {
		return product_store.create(product);
	};

	const deleteProduct = (id: number) => {
		return product_store.deleteProduct(id);
	};

	it('should have an index method', () => {
		expect(product_store.index).toBeDefined();
	});

	it('should have a show method', () => {
		expect(product_store.show).toBeDefined();
	});

	it('should have a add method', () => {
		expect(product_store.create).toBeDefined();
	});

	it('should have a delete method', () => {
		expect(product_store.deleteProduct).toBeDefined();
	});

	it(' should add a product', async () => {
		const createdProduct: Product = await createProduct(product);

		expect(createdProduct.price).toEqual(product.price);
		expect(createdProduct.name).toEqual(product.name);

		await deleteProduct(createdProduct.id);
	});

	it(' should return a list of products', async () => {
		const createdProduct: Product = await createProduct(product);
		const allProducts = await product_store.index();

		expect(allProducts).toBeDefined();

		await deleteProduct(createdProduct.id);
	});

	it('should return the correct product', async () => {
		const createdProduct: Product = await createProduct(product);
		const returnedProduct = await product_store.show(createdProduct.id);

		expect(returnedProduct).toEqual(createdProduct);

		await deleteProduct(createdProduct.id);
	});

	it('should update the product', async () => {
		const createdProduct: Product = await createProduct(product);
		const newData: BaseProduct = {
			name: 'lenovo idea pad',
			price: 15000,
		};

		const result = await product_store.update(createdProduct.id, newData);

		expect(result.name).toEqual(newData.name);
		expect(result.price).toEqual(newData.price);

		await deleteProduct(createdProduct.id);
	});

	it('should remove the product', async () => {
		const createdProduct: Product = await createProduct(product);

		await deleteProduct(createdProduct.id);

		const allProducts = await product_store.index();

		expect(allProducts).toEqual([]);
	});
});
