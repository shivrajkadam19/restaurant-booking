import User from "@/models/user";

export async function POST(request: Request) {
  // Parse the request body

  console.log("Inside signin");
  const body = await request.json();
  const { email, password } = body;

  // e.g. Insert new user into your DB
  if (!email || !password) {
    return new Response("Missing required fields", { status: 400 });
  }

  const oldUser = await User.findOne({ email });

  if (!oldUser) {
    return new Response("User does not exist", { status: 404 });
  }

  if (oldUser.password !== password) {
    return new Response("Invalid Password", { status: 401 });
  }

  return new Response(JSON.stringify(oldUser), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
}
