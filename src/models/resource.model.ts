import mongoose, { Schema } from "mongoose";
import { IResource } from "../types/resource.type";

const resourceSchema = new Schema<IResource>(
  {
    url: {
      type: String,
      required: true,
    },
    filename: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    team: {
      type: Schema.Types.ObjectId,
      ref: "Team",
      required: true,
    },
    filetype: {
      type: String,
      enum: ["document", "image", "codesnippet", "link"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Resource = mongoose.model<IResource>("Resource", resourceSchema);

export default Resource;
