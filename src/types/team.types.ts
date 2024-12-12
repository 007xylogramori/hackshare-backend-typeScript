import  { Document,Types } from "mongoose";
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
  owner: Types.ObjectId;
  members: TeamMember[];
  githubRepos: GithubRepo[];
}