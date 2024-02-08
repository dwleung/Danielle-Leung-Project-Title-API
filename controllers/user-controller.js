import dotenv from "dotenv";
import knexLibrary from "knex";
import knexfile from "../knexfile.js";
import jwt from "jsonwebtoken";
dotenv.config();
const knex = knexLibrary(knexfile);
const SECRET_KEY = process.env.SECRET_KEY;

//Retrieve user profie and return an object with user id, name, and username
const getProfile = async (req, res) => {
	const authUser = req.user;
	try {
		const user = await knex("users").where({ id: authUser.id }).first();
		const { id, name, username } = user;
		res.status(200).json({ id, name, username });
	} catch (error) {
		return res.status(400).json({ message: `User not found: ${error}` });
	}
};

//Create new user and return an object with user id, name, and JWT token
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
		const createdUser = await knex("users")
			.where({ id: newUserId })
			.first();
		const token = jwt.sign(
			{ id: createdUser.id, name: createdUser.name },
			SECRET_KEY,
			{
				expiresIn: "24h",
			}
		);
		res.status(200).json({
			id: createdUser.id,
			name: createdUser.name,
			token: token,
		});
	} catch (error) {
		res.status(500).json({
			message: `Unable to create new user: ${error}`,
		});
	}
};

// Find user in database, checks for correct password
// Return and object with userID & JWT token
const login = async (req, res) => {
	const { username, password } = req.body;

	try {
		const foundUser = await knex("users")
			.where({ username: username })
			.first();
		if (foundUser.length === 0) {
			return res.status(404).json({
				message: `User "${username}" not found. Please sign up!`,
			});
		}
		const user = foundUser;

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

// POST idea: add new idea to table "ideas". Stringify requirements array to put in table
// Returns posted idea object
const saveIdea = async (req, res) => {
	const { user_id, title, description, requirements } = req.body;
	const foundIdea = await knex("ideas").where({
		title: title,
		user_id: user_id,
	});
	if (foundIdea.length === 0) {
		const stringify = JSON.stringify(requirements);
		try {
			const newIdeaId = await knex("ideas").insert({
				user_id,
				title,
				description,
				requirements: stringify,
			});
			const newIdea = await knex("ideas").where({ id: newIdeaId[0] });
			res.status(201).json(newIdea);
		} catch (error) {
			res.status(500).json({
				message: `Unable to save idea: ${error}`,
			});
		}
	} else {
		return;
	}
};

//GET idea retrieves ideas for specific user
//Returns an array of objects
const getIdeas = async (req, res) => {
	const { user_id } = req.body;
	try {
		const data = await knex("ideas")
			.select("title", "description", "requirements")
			.where("user_id", user_id);
		if (!data) {
			console.log("No saved ideas for this user");
			return;
		}
		res.status(200).json(data);
	} catch (error) {
		res.status(404).json({
			message: `Error retrieving ideas: ${error}`,
		});
	}
};
//POST prompt: add user's interests & skills to "prompts" table
// Returns prompt object
const savePrompt = async (req, res) => {
	const { user_id, interests, skills, toggles } = req.body;

	try {
		const newPromptId = await knex("prompts").insert({
			user_id,
			interests,
			skills,
			toggles,
		});
		const newPrompt = await knex("prompts").where({ id: newPromptId[0] });
		res.status(201).json(newPrompt);
	} catch (error) {
		res.status(500).json({
			message: `Unable to save prompts: ${error}`,
		});
	}
};

// GET prompts: retrieves prompts that the user has saved
// Returns an array of objects
const getPrompts = async (req, res) => {
	try {
		const data = await knex("prompts")
			.select("interests", "skills", "toggles")
			.where("user_id", req.body.user_id);
		res.status(200).json(data);
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
