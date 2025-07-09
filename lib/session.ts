
import { User, UserSessionData } from "@/types";
import { getIronSession, SessionOptions } from "iron-session";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export const sessionOptions: SessionOptions = {
  password: process.env.SESSION_SECRET || "complex_password_123456_123456789_asdfghjklzxcvbnm",
  cookieName: "car_rental_session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};


export async function saveSessionWithSignedToken(user: Partial<User>) {
      const cookieStore = await cookies();
    const session = await getIronSession<UserSessionData>(
      cookieStore,
      sessionOptions
    );
    const jwtToken = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET as string ||"admin",
      { expiresIn: "1d" }
    );
    session.user = {
      id: user.id!,
      email: user.email!,
      role: user.role!,
      token: jwtToken,
      name: user.name!
    };
    await session.save();
    
}