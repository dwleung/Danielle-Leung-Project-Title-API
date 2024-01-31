"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const openai_1 = require("openai");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const openai = new openai_1.OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});
//custom prompt
let promptAI = (prompt) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield openai.chat.completions.create({
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
});
promptAI("Interests: home cooking, ultimate frisbee, travelling \n    Skills: Typescript, Auth").then((res) => console.log(res));
