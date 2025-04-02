import User from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  // Parse the request body

  console.log("Inside signin");
  const body = await request.json();
  const { email, password } = body;

  // e.g. Insert new user into your DB
  if (!email || !password) {
    return NextResponse.json(
      { messsage: "Missing required fields" },
      { status: 400 }
    );
  }

  const oldUser = await User.findOne({ email });

  if (!oldUser) {
    return NextResponse.json(
      { messsage: "User does not exist" },
      { status: 404 }
    );
  }

  if (oldUser.password !== password) {
    return NextResponse.json({ messsage: "Invalid Password" }, { status: 401 });
  }

  return NextResponse.json(
    { user: oldUser },
    {
      status: 201,
      headers: { "Content-Type": "application/json" },
    }
  );
}
