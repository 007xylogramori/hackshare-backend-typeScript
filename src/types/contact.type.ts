import  { Document } from "mongoose";
import { IUser } from "./user.type";

export interface IContact extends Document {
  user: IUser;
  subject: string;
  message: string;
  adminMessage?: string | null;
  status: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
