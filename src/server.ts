import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import orderRoutes from './handlers/orders';
import productRoutes from './handlers/product';
import userRoutes from './handlers/users';

const app: express.Application = express();
const address: string = '127.0.0.1:3000';

app.use(bodyParser.json());

orderRoutes(app);
productRoutes(app);
userRoutes(app);

app.get('/', function (req: Request, res: Response) {
	res.send('Hello World!');
});

app.listen(3000, function () {
	console.log(`starting app on: ${address}`);
});

export default app;
