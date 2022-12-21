export interface BaseProduct {
	name: string;
	price: number;
}

export interface Product extends BaseProduct {
	id: number;
}
