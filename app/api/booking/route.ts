import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import BookingModel from "@/models/booking"; ``
import { connectToMongoDB } from "@/lib/mongodb";
export async function POST(req: NextRequest) {
    try {
        await connectToMongoDB();
        const body = await req.json();
        console.log("Incoming booking request:", body); // Log incoming data

        const { userId, restaurantName, date, time, guests } = body;

        // Validate request
        if (!userId || !restaurantName || !date || !time || !guests) {
            console.log("Missing fields:", { userId, restaurantName, date, time, guests });
            return NextResponse.json({ error: "All fields are required." }, { status: 400 });
        }

        // Create and save the booking
        const newBooking = new BookingModel({
            user: new mongoose.Types.ObjectId(userId),
            restaurantName,
            date: new Date(date),
            time,
            guests: Number(guests),
        });

        await newBooking.save();
        console.log("Booking saved successfully:", newBooking); // Log success

        return NextResponse.json({ message: "Booking successful!", booking: newBooking }, { status: 201 });
    } catch (error) {
        console.error("Error saving booking:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}


export async function GET(req: NextRequest) {
    try {
        await connectToMongoDB();
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get("userId");

        if (!userId) {
            return NextResponse.json({ error: "User ID is required." }, { status: 400 });
        }

        const orders = await BookingModel.find({ user: new mongoose.Types.ObjectId(userId) }).sort({ date: -1 });

        console.log(NextResponse.json({ orders }, { status: 200 }));
        return NextResponse.json({ orders }, { status: 200 });
    } catch (error) {
        console.error("Error fetching orders:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
