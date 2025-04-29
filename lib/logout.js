import { serialize } from "cookie";

export function logout() {
  const serialized = serialize("auth-token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: -1,
    path: "/",
  });

  return new Response(
    JSON.stringify({ message: "Logout Successfully" }),
    {
      status: 200,
      headers: {
        "Set-Cookie": serialized,
        "Content-Type": "application/json",
      },
    }
  );
}
