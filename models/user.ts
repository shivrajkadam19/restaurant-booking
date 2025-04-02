// Importing mongoose library along with Document and Model types from it
import mongoose, { Document, Model } from "mongoose";

// Defining the structure of a user item using TypeScript interfaces
export type User = {
  name: string;
  email: string;
  avatar: string;
  phone?: string; // Optional, extracted from mock data
  address?: string; // Optional, extracted from mock data
  joinedAt?: string; // User registration date
  preferences?: {
    notificationsEnabled: boolean;
    marketingEnabled: boolean;
  };
  password: string;
};

// Merging user interface with mongoose's Document interface to create
// a new interface that represents a todo document in MongoDB
export interface UserDocument extends User, Document {
  createdAt: Date;
  updatedAt: Date;
}

// Defining a mongoose schema for the user document, specifying the types
// and constraints
const userSchema = new mongoose.Schema<UserDocument>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    phone: {
      type: Number,
    },
    password: {
      type: String,
    },
    address: [{ type: [String] }],
  },
  {
    // Automatically add 'createdAt' and 'updatedAt' fields to the document
    timestamps: true,
  }
);

// Creating a mongoose model for the todo document
const User: Model<UserDocument> =
  mongoose.models?.User || mongoose.model("User", userSchema);

export default User;
