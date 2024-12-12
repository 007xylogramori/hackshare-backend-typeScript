import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { genAI } from "../utils/Gemini.config";
const model = genAI.getGenerativeModel({ model: "gemini-pro" });
import { Request , Response } from "express";

export const generateResponse = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { title, description, teamId } = req.body;

    const prompt = `The title is : ${title} and the related description is : ${description} , if the data provided is related to achiving or implementing a task , give atmost 8 numbered  points to achieve or implement it with nothing else , start from the point without any prior description`;

    const result = await model.generateContent(prompt);

    const response = await result.response;

    const text = response.text();

    if (!title || !description || !teamId) {
      throw new ApiError(400, "Title, description, and team ID are required.");
    }

    res
      .status(201)
      .json(new ApiResponse(201, text, "Post created successfully."));
  } catch (error) {
    console.log("GEN AI ERROR : \n",error)
    throw new ApiError(400, "error occured");
  }
});
