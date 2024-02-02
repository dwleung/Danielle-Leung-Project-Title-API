import dotenv from "dotenv";
import knexLibrary from "knex";
import knexfile from "../knexfile.js";
import jwt from "jsonwebtoken";
dotenv.config();
const knex = knexLibrary(knexfile);

console.log("key", process.env.SECRET_KEY);
const signup = async (req, res) => {
	const { username, name, password } = req.body;

	if (!username || !name || !password) {
		return res.status(400).json({
			message: "Please provide a name, username, and password to sign up.",
		});
	}
	try {
		const result = await knex("users").insert(req.body);
		const newUserId = result[0];
		const createdUser = await knex("users").where({ id: newUserId });

		res.status(201).json(createdUser);
	} catch (error) {
		res.status(500).json({
			message: `Unable to create new user: ${error}`,
		});
	}
};

const login = async (req, res) => {
	const { username, password } = req.body;

	try {
		const foundUser = await knex("users").where({ username: username });
		if (foundUser.length === 0) {
			return res.status(404).json({
				message: `User with username ${username} not found`,
			});
		}
		const user = foundUser[0];

		if (user && user.password === password) {
			const token = jwt.sign(
				{ username: foundUser.username },
				process.env.SECRET_KEY,
				{ expiresIn: "24h" }
			);
			res.status(200).json({ token: token });
		} else if (user.password != password) {
			console.log("the passwords do not match");
			res.status(400).json({
				message: `Your password does not match the password on file. Please try again.`,
			});
		}
	} catch (error) {
		res.status(500).json({
			message: `Unable to retrieve user data for user with username ${username}: ${error}`,
		});
	}
};

// router
// 	.route("/:id/ideas")

// 	.post(userController.saveIdea)
const saveIdea = async (req, res) => {};
// 	.post(userController.savePrompt)
const savePrompt = async (req, res) => {};
// 	.get(userController.getIdeas);
const getIdeas = async (req, res) => {};

export default { signup, login, saveIdea, savePrompt, getIdeas };
