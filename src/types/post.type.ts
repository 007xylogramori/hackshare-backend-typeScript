import mongoose, {  Document } from "mongoose";
import { IUser } from "./user.type";
import { ITeam } from "./team.types";

export interface IPost extends Document {
  title: string;
  description: string;
  user: IUser;
  team: ITeam;
  likes: mongoose.Schema.Types.ObjectId[];
  link?: string;
  createdAt?: Date;
  updatedAt?: Date;
}