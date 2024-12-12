import mongoose, { Schema,  Model } from "mongoose";
import { ITeam } from "../types/team.types";



const teamSchema = new Schema<ITeam>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    code: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    members: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        role: {
          type: String,
          default: "member",
        },
      },
    ],
    githubRepos: [
      {
        name: { type: String, required: true },
        url: { type: String, required: true },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Team: Model<ITeam> = mongoose.model<ITeam>("Team", teamSchema);

export { Team };
