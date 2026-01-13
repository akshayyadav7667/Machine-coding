import User from "../models/user.js";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { name, email, dob, gender, password } = req.body;

  try {
    if (!name || !email || !password || !dob || !gender) {
      return res.status(400).json({ message: "Missing Details !" });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ message: "User already Exists" });
    }

    const hashpasswod = await bcrypt.hash(password, 10);

    console.log(hashpasswod);

    await User.create({
      name,
      email,
      password: hashpasswod,
      dob,
      gender,
    });

    // console.log(user)

    // console.log({ name, email, password, dob, gender });

    return res.status(201).json({
      message: "User Registraction ",
      name,
      email,
      dob,
      gender,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json("Invliad Details");
    }

    const validUser = await User.findOne({ email });

    if (!validUser) {
      return res.status(400).json("User not found !!");
    }

    // console.log(validUser);
    const ismatch = await bcrypt.compare(password, validUser.password);

    // console.log(ismatch);

    if (!ismatch) {
      return res.status(400).json("Invalid Credentails");
    }

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // console.log(token);

    // console.log(validUser);

    res.cookie("token", token,{
        httpOnly:true,
        secure:false,
        //sameSite:"lax",
        maxAge: 1000*60*60*24*2
    });

    const { password:userPassword , ...data } = validUser._doc;

    return res.status(200).json({ message: "Login Successfully", data });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
