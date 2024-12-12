import { GoogleGenerativeAI } from "@google/generative-ai";
import { config } from "./config";
const genAI = new GoogleGenerativeAI(config.geminiApiKey!);
export { genAI };