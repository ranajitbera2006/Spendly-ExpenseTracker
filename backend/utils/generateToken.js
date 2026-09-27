import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY || "15d",
  });

  const isProduction = process.env.NODE_ENV === "production";

  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
    httpOnly: true, // Guards against XSS attacks
    sameSite: isProduction ? "none" : "lax", // "none" allows cross-site requests
    secure: isProduction ? true : false, // HTTPS is mandatory when sameSite is "none"
  });

  return token;
};
