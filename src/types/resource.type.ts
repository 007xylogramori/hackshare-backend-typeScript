import { Document } from "mongoose";
import { ITeam } from "./team.types";
import { IUser } from "./user.type";

export interface IResource extends Document {
    url: string;
    filename: string;
    description?: string;
    user: IUser;
    team: ITeam;
    filetype: "document" | "image" | "codesnippet" | "link";
    createdAt?: Date;
    updatedAt?: Date;
  }