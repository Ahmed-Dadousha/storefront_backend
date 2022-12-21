export interface OrderProduct {
	product_id: number;
	quantity: number;
}

export interface BaseOrder {
	products: OrderProduct[];
	user_id: number;
	status: boolean;
}

export interface Order extends BaseOrder {
	id: number;
}
