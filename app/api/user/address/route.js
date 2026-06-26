import connectDb from "@/db/connectDb";
import User from "@/models/User";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function POST(req) {
  const body = await req.json();

  await connectDb();

  const session = await getServerSession(authOptions);
  const user = await User.findOne({ email: session.user.email });

  user.address = body;
  await user.save();

  return Response.json({ success: true });
}