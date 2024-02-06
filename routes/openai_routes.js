import { OpenAI } from "openai";
import dotenv from "dotenv";
import express from "express";
const router = express.Router();
dotenv.config();

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});

router.post("/", async (req, res) => {
	try {
		const messagesArray = req.body;
		messagesArray.unshift({
			role: "system",
			content: `Your task is to generate a software engineering project idea based on popular interests or leading industries. ${Math.random()}The project should have 3 requirements that helps the user understand what to integrate in the project. The project should have a paragraph description indicating the project's impact, intended audience, and any other features.  Your response should be structured as a object with the keys: title, description, and requirements.${Date()}`,
		});

		const response = await openai.chat.completions.create({
			model: "gpt-4-turbo",
			messages: messagesArray,
			temperature: 0.8,
			presence_penalty: 1.4,
			frequency_penalty: 1.8,
			response_format: { type: "json_object" },
		});
		res.status(200).send(response.choices[0].message);
	} catch (error) {
		res.status(500).json({
			message: `Unable to generate idea: ${error}`,
		});
	}
});

router.post("/custom", async (req, res) => {
	console.log("You've made it to openai/custom");
	const messagesArray = req.body;
	messagesArray.unshift({
		role: "system",
		content: "Your task is to generate a software engineering project idea for a developer of beginner to medium skill. The project should have 3 requirements that helps the user understand what to integrate in the project. The project should have a paragraph description indicating the project's impact, intended audience, and any other features.  Your response should be structured as a JSON object with keys: title, description, and requirements.",
	});

	console.log("This is after unshift:", messagesArray);

	const response = await openai.chat.completions.create({
		model: "gpt-4-turbo",
		messages: messagesArray,
		temperature: 0.8,
		presence_penalty: 1.4,
		frequency_penalty: 1.8,
		response_format: { type: "json_object" },
	});
	res.status(200).send(response.choices[0].message);
});

export default router;
