import { db } from "@/config/db";
import { signJWT } from "@/lib/jwt";
import User from "@/schema/User";
import bcrypt from "bcryptjs";
import { serialize } from "cookie";

export async function POST(req) {
  try {
    // 1. Parse request body
    await db();
    const { email, password } = await req.json();

    if (!email || !password) {
      return new Response(
        JSON.stringify({ message: "Email and password are required." }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // 2. Connect to DB
    

    // 3. Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return new Response(
        JSON.stringify({ message: "Invalid email or password." }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    // 4. Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return new Response(
        JSON.stringify({ message: "Invalid email or password." }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    // 5. Sign JWT and serialize cookie
    const token = await signJWT({ email: user.email, name: user.name });
    const serialized = serialize("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3600,
      path: "/",
    });

    // 6. Return success response
    return new Response(
      JSON.stringify({
        message: "Login successful.",
        data: { name: user.name, email: user.email },
      }),
      {
        status: 200,
        headers: {
          "Set-Cookie": serialized,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (err) {
    console.error("Login error:", err);
    return new Response(
      JSON.stringify({ message: "Internal server error.", error: err.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

import { logout } from "@/lib/logout";

export async function GET() {
  return logout();
}

