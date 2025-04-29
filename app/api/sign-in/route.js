import { db } from "@/config/db";
import { signJWT } from "@/lib/jwt";
import User from "@/schema/User";
import bcrypt from "bcryptjs";
import {serialize} from "cookie"
import { RoleModel } from "@/schema/Role";
import { assignPermissionsToRole } from "@/lib/Permission_Role";
export async function POST(req) {
  // 1. Parse request
  const { name, email, password } = await req.json();

  // 2. Connect to DB
  await db();

  // 3. Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // 4. Check if user already exists
  const exists = await User.exists({ email });
  if (exists) {
    return new Response(
      JSON.stringify({ message: "Email already in use" }),
      { status: 409 }
    );
  }

  let roles = await RoleModel.findOne({ name: "developer" });

  if (!roles) {
    roles = await RoleModel.create({ name: "developer" });
  }
  
  // 5. Create the user
  try {
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      Role:[roles._id]
    });
const token = await signJWT({name,email})
const serialized = serialize("auth-token", token,{
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: 'strict',
    maxAge: 3600,
    path: '/'
  })
  if(roles.name==="developer"){
    await assignPermissionsToRole("developer", ["create-user", "delete-user", "view-dashboard"]);
  }
  if(roles.name==="admin"){
    await assignPermissionsToRole("admin", ["create-user", "delete-user", "view-dashboard"]);

  }
  if(roles.name==="viewer"){
    await assignPermissionsToRole("viewer", ["view-dashboard"]);
  }

    return new Response(
      JSON.stringify({
        message: "User created",
        data: { id: user._id, name: user.name, email: user.email },
      }),
      { status: 201,
        headers: {
            "Set-Cookie": serialized,
            "Content-Type": "application/json",
          },
      }
    );
  } catch (err) {
    console.error("Error creating user:", err);
    return new Response(
      JSON.stringify({
        message: "User not created",
        error: err.message || err,
      }),
      { status: 500 }
    );
  }
}
