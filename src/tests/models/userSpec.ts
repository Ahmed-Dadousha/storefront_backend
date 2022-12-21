import { UserStore } from '../../models/user';
import { BaseAuthUser, BaseUser, User } from '../../interfaces/user.interface';

const user_store = new UserStore();

describe('User Model', () => {
	const user: BaseAuthUser = {
		username: 'ahmedDadousha',
		firstname: 'ahmed',
		lastname: 'Dadousha',
		password: 'password4444',
	};

	const createUser = (user: BaseAuthUser) => {
		return user_store.create(user);
	};

	const deleteUser = (id: number) => {
		return user_store.deleteUser(id);
	};

	it('should have an index method', () => {
		expect(user_store.index).toBeDefined();
	});

	it('should have a show method', () => {
		expect(user_store.show).toBeDefined();
	});

	it('should have a create method', () => {
		expect(user_store.create).toBeDefined();
	});

	it('should have a remove method', () => {
		expect(user_store.deleteUser).toBeDefined();
	});

	it('should create a user', async () => {
		const createdUser: User = await createUser(user);

		expect(createdUser.username).toBe(user.username);
		expect(createdUser.firstname).toBe(user.firstname);
		expect(createdUser.lastname).toBe(user.lastname);

		await deleteUser(createdUser.id);
	});

	it(' should return a list of users', async () => {
		const createdUser: User = await createUser(user);
		const users = await user_store.index();

		expect(users).toBeDefined();

		await deleteUser(createdUser.id);
	});

	it('should return the correct user', async () => {
		const createdUser: User = await createUser(user);
		const returnedUser = await user_store.show(createdUser.id);

		expect(returnedUser).toEqual(createdUser);

		await deleteUser(createdUser.id);
	});

	it('should remove the user', async () => {
		const createdUser: User = await createUser(user);

		await deleteUser(createdUser.id);

		const users = await user_store.index();

		expect(users).toEqual([]);
	});

	it(' should update the user', async () => {
		const createdUser: User = await createUser(user);
		const newUserData: BaseUser = {
			firstname: 'ali',
			lastname: 'ibrahim',
		};

		const newUser = await user_store.update(createdUser.id, newUserData);

		expect(newUser.firstname).toEqual(newUserData.firstname);
		expect(newUser.lastname).toEqual(newUserData.lastname);

		await deleteUser(createdUser.id);
	});

	it('should authenticates the user with a password', async () => {
		const createdUser: User = await createUser(user);

		const returnedUser = await user_store.authenticate(
			createdUser.username,
			createdUser.password
		);

		if (returnedUser) {
			expect(returnedUser.username).toBe(createdUser.username);
			expect(returnedUser.firstname).toBe(createdUser.firstname);
			expect(returnedUser.lastname).toBe(createdUser.lastname);
		}

		await deleteUser(createdUser.id);
	});
});
