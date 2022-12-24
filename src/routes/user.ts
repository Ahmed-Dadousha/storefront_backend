import express from 'express';
import userHandler from '../handlers/users';
import { AuthHeader } from '../handlers/authentication';

const userRouter = express.Router();
const handler = new userHandler();

userRouter.get('/', AuthHeader, handler.index);
userRouter.post('/create', handler.create);
userRouter.get('/:id', AuthHeader, handler.show);
userRouter.put('/:id', AuthHeader, handler.update);
userRouter.delete('/:id', AuthHeader, handler.deleteUser);
userRouter.post('/auth', handler.authenticate);

export default userRouter;
