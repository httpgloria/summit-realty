import bcrypt from "bcrypt";
import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";

import dotenv from "dotenv";
dotenv.config();

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user and save to db
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    res.status(201).json({ message: "User created successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to create user." });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    //Check if user exists
    const user = await prisma.user.findUnique({
      where: { username: username },
    });

    if (!user) return res.status(401).json({ message: "Invalid credentials." });

    //Check if password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid)
      return res.status(401).json({ message: "Invalid credentials." });

    //Generate token and send to user
    const age = 1000 * 60 * 60 * 24 * 7;
    // const age = 1000 * 60 * 60 * 24;

    const token = jwt.sign(
      {
        id: user.id,
        isAdmin: true,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: age }
    );

    const { password: userPassword, ...userInfo } = user;

    res
      .cookie("token", token, {
        httpOnly: true,
        maxAge: age,
      })
      .status(200)
      .json(userInfo);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to login." });
  }
};
export const logout = (req, res) => {
  res.clearCookie("token").status(200).json({ message: "Logout Successful." });
};

//ADMIN LOGIN

export const adminLogin = async (req, res) => {
  const { username, password } = req.body;

  try {
    //Check if user exists
    const user = await prisma.admin.findUnique({
      where: { username: username },
    });

    if (!user) return res.status(401).json({ message: "Invalid credentials." });

    //Check if password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid)
      return res.status(401).json({ message: "Invalid credentials." });

    //Generate token and send to user
    const age = 1000 * 60 * 60 * 24 * 7;

    const token = jwt.sign(
      {
        id: user.id,
        isAdmin: true,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: age }
    );

    const { password: userPassword, ...userInfo } = user;

    res
      .cookie("token", token, {
        httpOnly: true,
        maxAge: age,
      })
      .status(200)
      .json(userInfo);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to login." });
  }
};

export const adminLogout = (req, res) => {
  res.clearCookie("token").status(200).json({ message: "Logout Successful." });
};
