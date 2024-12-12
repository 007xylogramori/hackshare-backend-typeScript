import mongoose, { Document } from "mongoose";

export interface IUser extends Document {
  username: string;
  email: string;
  fullName: string;
  bio?: string;
  password: string;
  refreshToken?: string;
  profilePicture?: string;
  coverPicture?: string;
  teams?: mongoose.Types.ObjectId[];
  socials: {
    github?: string;
    linkedin?: string;
    facebook?: string;
    behance?: string;
  };
  isPasswordCorrect(password: string): Promise<boolean>;
  generateAccessToken(): string;
  generateRefreshToken(): string;
}

export interface AuthRequest extends Request {
  userId: IUser;
}