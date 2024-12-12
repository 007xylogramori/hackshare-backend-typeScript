import mongoose, { Schema, Document } from "mongoose";

// Define an interface for the Contact document
interface IContact extends Document {
  user: mongoose.Schema.Types.ObjectId;
  subject: string;
  message: string;
  adminMessage?: string | null;
  status: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

// Create the contact schema
const contactSchema = new Schema<IContact>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    subject: {
      type: String,
      required: true,
      trim: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    adminMessage: {
      type: String,
      trim: true,
      default: null,
    },
    status: {
      type: Boolean,
      default: false, // Changed to a boolean value
    },
  },
  {
    timestamps: true,
  }
);

// Create the model
const Contact = mongoose.model<IContact>("Contact", contactSchema);

export { Contact };
