import mongoose, {  Document, Types } from "mongoose";
import { IUser } from "./user.type";

export interface IComment {
  user: IUser;
  content: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ICommunityPost extends Document {
  user: IUser;
  title: string;
  content: string;
  tags: string[];
  likes: mongoose.Schema.Types.ObjectId[];
  comments: Types.DocumentArray<IComment>;
  createdAt?: Date;
  updatedAt?: Date;
}