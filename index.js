import { OpenAI } from "openai";
import dotenv from "dotenv";
dotenv.config();

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});

//custom prompt
let promptAI = async (prompt) => {
	const response = await openai.chat.completions.create({
		model: "gpt-3.5-turbo",
		messages: [
			{
				role: "system",
				content: "You will be provided with a set of interests and skills, and your task is to generate a software engineering project title, description, and 2-3 requirements using at least one interest and at least one skill.",
			},
			{
				role: "user",
				content: prompt,
			},
		],
		temperature: 0.8,
		max_tokens: 256,
	});
	return response.choices[0].message;
};

promptAI(
	"Interests: home cooking, ultimate frisbee, travelling \n    Skills: Typescript, Auth"
).then((res) => console.log(res));
