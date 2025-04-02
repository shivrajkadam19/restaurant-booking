import User from "@/models/user";

export async function GET(request: Request) {
  // For example, fetch data from your DB here
  const users = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
  ];
  return new Response(JSON.stringify(users), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(request: Request) {
  // Parse the request body

  console.log("Inside signup");
  const body = await request.json();
  const { name, email, password } = body;

  // e.g. Insert new user into your DB
  if (!name || !email || !password) {
    return new Response("Missing required fields", { status: 400 });
  }

  const oldUser = await User.findOne({ email });

  if (oldUser) {
    return new Response("User already exists", { status: 401 });
  }

  const newUser = await User.create({
    name,
    email,
    password,
  });

  return new Response(JSON.stringify(newUser), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
}
