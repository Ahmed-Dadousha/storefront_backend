# Storefront Backend Project

## Set up

## set up database

- connect to default postgres database using `psql -U postgres`
- In psql run the next command to create a user

  - `CREATE USER 'username' WITH PASSWORD 'password';`

- In psql run the next command to create a database for dev and a database for dev
  - `CREATE DATABASE 'databaseName_dev';`
  - `CREATE DATABASE 'databaseName_test';`
- Connect to the database and grant all privileges
  - Grant for dev database
    - `\c 'databasename_dev'`
    - `GRANT ALL PRIVILEGES ON DATABASE 'databasename_dev' TO 'username';`
  - Grant for test database
    - `\c 'databasename_test'`
    - `GRANT ALL PRIVILEGES ON DATABASE 'databasename_test' TO 'username';`

##

- Run `npm i` to install all dependencies
- Run `db-migrate up` to connect to database and create the tables in it
- Run `npm run build` to build the app

## Prepare env

- add a `.env` file in the root directory and set the missing `...` environment parameters

```
# DB VARIABLES
POSTGRES_HOST=localhost
POSTGRES_DB_DEV=...
POSTGRES_DB_TEST=...
POSTGRES_USER=...
POSTGRES_PASSWORD=...
ENV=dev
# BCRYPT VARIABLES
BCRYPT_PASSWORD=....
SALT_ROUNDS=10
# JWT
SECRET_TOKEN=...
```

## Start the app

- Run `npm run start` to start the app and get access http://127.0.0.1:3000

## Ports

- After start up, the server will start on port `3000` and the database on port `5432`

## Test the app

- add a `database.json` file in the root directory with the next code

```
{
	"dev": {
		"driver": "pg",
		"host": "127.0.0.1",
		"database": { "ENV": "POSTGRES_DB_DEV" },
		"user": { "ENV": "POSTGRES_USER" },
		"password": { "ENV": "POSTGRES_PASSWORD" }
	},
	"test": {
		"driver": "pg",
		"host": "127.0.0.1",
		"database": { "ENV": "POSTGRES_DB_TEST" },
		"user": { "ENV": "POSTGRES_USER" },
		"password": { "ENV": "POSTGRES_PASSWORD" }
	}
}

```

- `npm run test` to run all tests
