import UserModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userExists = await UserModel.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const isAdmin = email === process.env.ADMIN_MAIL;

    await UserModel.create({
      name,
      email,
      password: hashedPassword,
      isAdmin,
    });

    res.status(200).json({ message: "Signup successful" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const UserDetails = await UserModel.findOne({ email });

  if (!UserDetails) {
    return res.status(400).json({ message: "Email not found" });
  }

  const pass = bcrypt.compareSync(password, UserDetails.password);

  if (!pass) {
    return res.status(400).json({ message: "Incorrect password" });
  }

  jwt.sign(
    {
      email,
      name: UserDetails.name,
      id: UserDetails._id,
      isAdmin: UserDetails.isAdmin,
    },
    process.env.JWT_SECRET,
    {},
    (err, token) => {
      if (err) throw err;
      // res
      //   .cookie("token", token, {
      //     httpOnly: true,
      //     secure: true,
      //     sameSite: "none",
      //     domain: ".onrender.com",
      //   })
      //   .status(200)
      //   .json({
      //     message: "Login successful",
      //     token,
      //     user: {
      //       id: UserDetails._id,
      //       name: UserDetails.name,
      //       email: UserDetails.email,
      //       isAdmin: UserDetails.isAdmin,
      //     },
      //   });
      res.status(200).json({
        message: "Login successful",
        token,
        user: {
          id: UserDetails._id,
          name: UserDetails.name,
          email: UserDetails.email,
          isAdmin: UserDetails.isAdmin,
        },
      });
    },
  );
};

// export const profile = (req, res) => {
//   const token = req.cookies.token;

//   if (!token) {
//     return res.status(401).json({ message: "No token" });
//   }

//   jwt.verify(token, process.env.JWT_SECRET, (err, info) => {
//     if (err) return res.status(401).json({ message: "Invalid token" });
//     res.json(info);
//   });
// };
export const profile = (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "No token" });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, info) => {
    if (err) return res.status(401).json({ message: "Invalid token" });

    res.json(info);
  });
};

export const logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    domain: ".onrender.com",
  });
  res.status(200).json({ message: "Logged out" });
};
