import express from 'express';
import productHandler from '../handlers/product';
import { AuthHeader } from '../handlers/authentication';

const productRouter = express.Router();
const handler = new productHandler();

productRouter.get('/', handler.index);
productRouter.post('/create', AuthHeader, handler.create);
productRouter.get('/:id', handler.show);
productRouter.put('/:id', AuthHeader, handler.update);
productRouter.delete('/:id', AuthHeader, handler.deleteP);

export default productRouter;
