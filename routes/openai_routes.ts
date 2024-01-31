import { OpenAI } from "openai";
import * as readline from "node:readline/promises";

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});

const userInterface = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

userInterface.prompt();

userInterface.on("line", async (input) => {
	const res = await openai.chat.completions.create({
		model: "gpt-3.5-turbo",
		temperature: 1,
		max_tokens: 100,
		messages: [{ role: "user", content: input }],
	});
	console.log(res.choices[0].message.content);
	userInterface.prompt();
});
