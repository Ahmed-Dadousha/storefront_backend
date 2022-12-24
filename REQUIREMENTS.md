# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Products

- Index `/api/products` [GET]
- Create `/api/products/create` [POST] [token required]
- Read `/api/products/:id` [GET]
- Update `/api/products/:id` [PUT] [token required]
- Delete `/api/products/:id` [DELETE] [token required]

#### Users

- Index `/api/users` [GET] [token required]
- Create `/api/users/create` [POST]
- Read `/api/users/:id` [GET] [token required]
- Update `/api/users/:id` [PUT] [token required]
- Delete `/api/users/:id` [DELETE] [token required]
- Auth `/api/users/auth` [POST]

#### Orders

- Index `/api/orders` [GET] [token required]
- Create `/api/orders/create` [POST] [token required]
- Read `/api/orders/:id` [GET] [token required]
- Update `/api/orders/:id` [PUT] [token required]
- Delete `/api/orders/:id` [DELETE] [token required]

## Data Shapes

#### Product

Table: _products_

- id `SERIAL PRIMARY KEY`
- name `VARCHAR`
- price `INTEGER`

#### User

Table: _users_

- id `SERIAL PRIMARY KEY`
- username `VARCHAR`
- firstname `VARCHAR`
- lastname `VARCHAR`
- password_digest `VARCHAR`

#### Orders

Table: _orders_

- id `SERIAL PRIMARY KEY`
- user_id `INTEGER` `REFERENCES users(id)`
- status `BOOLEAN`

Table: _order_products_

- order_id `INTEGER` `REFERENCES orders(id)`
- product_id `INTEGER` `REFERENCES products(id)`
- quantity `INTEGER`
