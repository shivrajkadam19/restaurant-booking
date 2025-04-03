import mongoose, { Document, Schema, Model } from "mongoose";
import { UserDocument } from "./user"; // Import User model for reference

export interface Booking extends Document {
  user: mongoose.Types.ObjectId;
  restaurantName: string;
  date: Date;
  time: string;
  guests: number;
}

const bookingSchema = new Schema<Booking>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    restaurantName: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    guests: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const BookingModel: Model<Booking> =
  mongoose.models?.Booking || mongoose.model<Booking>("Booking", bookingSchema);

export default BookingModel;
