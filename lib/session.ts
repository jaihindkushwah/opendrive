import { SessionOptions } from "iron-session";

export const sessionOptions: SessionOptions = {
  password: process.env.SESSION_SECRET || "complex_password_123456_123456789_asdfghjklzxcvbnm",
  cookieName: "car_rental_session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};

