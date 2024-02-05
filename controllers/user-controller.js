import dotenv from "dotenv";
import knexLibrary from "knex";
import knexfile from "../knexfile.js";
import jwt from "jsonwebtoken";
dotenv.config();
const knex = knexLibrary(knexfile);
const SECRET_KEY = process.env.SECRET_KEY;

// A Profile end-point that will return user information,
// in this example, the user's name that they provided
// when they signed up.
// The authorize middleware function must check for
// a token, verify that the token is valid, decode
// the token and put the decoded data onto req.decoded
const getProfile = async (req, res) => {
	console.log("req.user", req.user);
	const authUser = req.user;
	try {
		const user = await knex("users").where({ id: authUser.id }).first();
		console.log("User found in database:", user);
		const { id, name, username } = user;
		res.status(200).json({ id, name, username });
	} catch (error) {
		return res.status(400).json({ message: `User not found: ${error}` });
	}
};

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
				message: `User "${username}" not found. Please sign up!`,
			});
		}
		const user = foundUser[0];
		console.log("This is my foundUser", user);

		if (user && user.password === password) {
			const token = jwt.sign(
				{ id: user.id, name: user.name },
				SECRET_KEY,
				{ expiresIn: "24h" }
			);
			res.status(200).json({ id: user.id, token: token });
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
const saveIdea = async (req, res) => {
	const { user_id, title, description, requirements } = req.body;

	try {
		const newIdeaId = await knex("ideas").insert({
			user_id,
			title,
			description,
			requirements,
		});

		console.log(newIdeaId);
		const newIdea = await knex("ideas").where({ id: newIdeaId[0] });

		res.status(201).json(newIdea);
	} catch (error) {
		res.status(500).json({
			message: `Unable to save idea: ${error}`,
		});
	}
};

// 	.get(userController.getIdeas);
const getIdeas = async (req, res) => {
	const userId = req.params.id;
	console.log("This is the params userID: ", userId);
	try {
		const data = await knex("ideas")
			.select("title", "description", "requirements")
			.where("user_id", userId);
		res.status(200).json(data[0]);
	} catch (error) {
		res.status(404).json({
			message: `Error retrieving prompts: ${error}`,
		});
	}
};
// 	.post(userController.savePrompt)
const savePrompt = async (req, res) => {
	const { user_id, interests, skills, toggles } = req.body;

	try {
		const newPromptId = await knex("prompts").insert({
			user_id,
			interests,
			skills,
			toggles,
		});

		console.log(newPromptId);
		const newPrompt = await knex("prompts").where({ id: newPromptId[0] });

		res.status(201).json(newPrompt);
	} catch (error) {
		res.status(500).json({
			message: `Unable to save prompts: ${error}`,
		});
	}
};

const getPrompts = async (req, res) => {
	const userId = req.params.id;
	console.log("This is the params userID: ", userId);
	try {
		const data = await knex("prompts")
			.select("interests", "skills", "toggles")
			.where("user_id", userId);
		res.status(200).json(data[0]);
	} catch (error) {
		res.status(404).json({
			message: `Error retrieving prompts: ${error}`,
		});
	}
};

export default {
	signup,
	login,
	getProfile,
	saveIdea,
	getIdeas,
	savePrompt,
	getPrompts,
};
