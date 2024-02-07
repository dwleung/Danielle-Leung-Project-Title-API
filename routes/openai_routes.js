import { OpenAI } from "openai";
import dotenv from "dotenv";
import express from "express";
const router = express.Router();
dotenv.config();

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});

// POST request to OpenAI API for project idea
// Returns a JSON object with the keys: title, description, requirements (array of strings)
router.post("/", async (req, res) => {
	try {
		const messagesArray = req.body;
		// Add the system role to the chat history that is provided to OpenAI API
		// Math.random() adds noise to the prompts resulting in better variety
		messagesArray.unshift({
			role: "system",
			content: `Your task is to generate a software engineering project idea for a developer looking to upskill or get inspiration for their side project. The project should have 3 requirements that helps the user understand what to integrate in the project. The project should have a paragraph description indicating the project's impact, intended audience, and any other features.  Your response should be structured as a JSON object with keys: title, description, and requirements(which is an array of 3 sentences).`,
		});
		console.log("after unshift:", messagesArray);
		const response = await openai.chat.completions.create({
			model: "gpt-3.5-turbo-0125",
			messages: messagesArray,
			temperature: 0.8,
			presence_penalty: 1.4,
			frequency_penalty: 1.8,
			response_format: { type: "json_object" },
		});
		console.log(response.choices[0]);
		res.status(200).send(response.choices[0].message);
	} catch (error) {
		res.status(500).json({
			message: `Unable to generate idea: ${error}`,
		});
	}
});

export default router;
