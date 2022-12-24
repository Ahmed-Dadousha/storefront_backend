import express from 'express';
import orderHandler from '../handlers/orders';
import { AuthHeader } from '../handlers/authentication';

const orderRouter = express.Router();
const handler = new orderHandler();

orderRouter.get('/', AuthHeader, handler.index);
orderRouter.post('/create', AuthHeader, handler.create);
orderRouter.get('/:id', AuthHeader, handler.show);
orderRouter.put('/:id', AuthHeader, handler.update);
orderRouter.delete('/:id', AuthHeader, handler.deleteOrder);

export default orderRouter;
