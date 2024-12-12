import  { Document,Types } from "mongoose";
import { IUser } from "./user.type";
interface GithubRepo {
  name: string;
  url: string;
  _id?: Types.ObjectId;
}

interface TeamMember {
  user: Types.ObjectId;
  role: string;
}

export interface ITeam extends Document {
  name: string;
  code: string;
  owner: IUser;
  members: TeamMember[];
  githubRepos: GithubRepo[];
}