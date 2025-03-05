import bcrypt from 'bcrypt';
import { nanoid } from 'nanoid';

let users = [
	{
		id: 'LqCkAkJGce',
		firstname: 'Cinderella',
		lastname: 'Urmom',
		contact: 12345678,
		email: 'cinder@example.com',
		username: 'cinderella',
		password:
			'$2b$10$Zt6g6wrF/wQJikwE/yV.Su7LEavgRWLwDx.WsDc07UTvhBUvpuOdi',
	},
	{
		id: 'MO_og9f55-',
		firstname: 'Alice',
		lastname: 'Wonderland',
		contact: 12345678,
		email: 'alice@example.com',
		username: 'Alice',
		password:
			'$2b$10$jEH7PaOn3p2lYaDb31XClumCYEALXdq4JJsy3zmEqspqvFJVeQ.ri',
	},
];

const saltRounds = 10;

// @desc Get all users
//@route GET /api/posts
export const getUsers = async (req, res, next) => {
	console.log(req.query);
	const limit = parseInt(req.query.limit);
	if (!isNaN(limit) && limit > 0) {
		return res.status(200).json(postMessage.slice(0, limit));
	}

	res.status(200).json(users);
};

export const createUser = async (req, res, next) => {
	try {
		const { firstname, lastname, contact, email, username, password } =
			req.body;
		if (!username || !password) {
			return res
				.status(400)
				.json({ error: 'Username and Password are required' });
		}

		const existingUser = users.find((user) => user.username === username);
		if (existingUser) {
			return res.status(400).json({ error: 'User already exists' });
		}

		const hashedPassword = await bcrypt.hash(
			password.toString(),
			saltRounds
		);
		const newUser = {
			id: nanoid(10),
			firstname: firstname,
			lastname: lastname,
			contact: contact,
			email: email,
			username: username,
			password: hashedPassword,
		};

		users.push(newUser);

		res.status(201).json({
			message: 'User created successfully',
			user: newUser,
		});
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

export const loginUser = async (req, res, next) => {
	try {
		const { username, password } = req.body;
		const findUser = users.find((user) => user.username === username);
		if (!findUser) {
			return res.status(500).json({ error: 'No such User' });
		}

		const matchPassword = await bcrypt.compare(password, findUser.password);
		if (!matchPassword) {
			return res.status(500).json({ error: 'Invalid credentials' });
		}

		const { password: hashedPassword, ...userWithoutPassword } = findUser;
		res.status(200).json({
			message: 'Login successful',
			user: userWithoutPassword,
		});
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

export const updateUsername = async (req, res, next) => {
	const userID = req.params.id;

	const user = users.find((user) => user.id === userID);
	if (!user) {
		return res
			.status(404)
			.json({ error: `User with the id ${userID} was not found` });
	}

	user.username = req.body.username;
	res.status(200).json(user);
};
