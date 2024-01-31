"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const openai_routes_1 = __importDefault(require("./routes/openai_routes"));
const user_routes_1 = __importDefault(require("./routes/user_routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
//Home
app.get("/", (req, res) => {
    res.send("Welcome!");
});
//OpenAI route
app.use("/openai", openai_routes_1.default);
//User route
app.use("/user", user_routes_1.default);
app.listen(PORT, () => {
    console.log(`[server]: Server running on PORT: ${PORT}`);
});
