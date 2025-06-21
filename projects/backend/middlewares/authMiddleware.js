import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export const authenticateToken = (req, res, next) => {
  // const token = req.headers.authorization?.split(" ")[1];
  // if (!token) return res.status(401).json({ error: "Access token required" });

  // jwt.verify(token, JWT_SECRET, (err, user) => {
  //   if (err) return res.status(403).json({ error: "Invalid token" });
  //   req.user = "68554453f775dc2904e5ce8b"//user;
  //   next();
  // });
  req.user = "68554453f775dc2904e5ce8b"//user;
  next();
};
