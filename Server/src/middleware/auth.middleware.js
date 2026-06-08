import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  // const token = req.cookies?.token;
  // if (!token) {
  //   return res.status(401).json({ error: "Not authenticated" });
  // }

  // jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
  //   if (err) {
  //     return res.status(403).json({ error: "Invalid token" });
  //   }
  //   req.user = decoded;
  //   next();
  // });
    const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "No token" });
  }

  const realToken = token.split(" ")[1];

  jwt.verify(realToken, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(401).json({ message: "Invalid token" });

    req.user = user;
    next();
  });
};
