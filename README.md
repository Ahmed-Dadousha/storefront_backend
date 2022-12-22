# Storefront Backend Project

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

## Set up

- `npm i` to install all dependencies
- `db-migrate up` to connect to database and create the tables in it
- `npm run build` to build the app

## Start the app

- `npm run start` to start the app and get access http://127.0.0.1:3000
- the app will run on port `3000`
- the database will run on port `5432`

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
