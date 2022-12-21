export interface BaseUser {
	firstname: string;
	lastname: string;
}

export interface BaseAuthUser extends BaseUser {
	username: string;
	password: string;
}

export interface User extends BaseAuthUser {
	id: number;
}
