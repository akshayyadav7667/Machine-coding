import Admin from "../models/admin.js";
import bcrypt from "bcrypt";
import { sendOtp } from "../utils/sendOtp.js";
import jwt from "jsonwebtoken";

// this is only for register , but this is not good , admin is to regsiter , this is only made for development phase  !
export const register = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Cridentails" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const adminData = await Admin.create({
      email,
      password: hashedPassword,
    });

    return res
      .status(200)
      .json({ success: true, message: "Register successful", adminData });
  } catch (error) {
    return res.status(400).json({ success: false, message: error });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Fill all the details " });
    }

    const validAdmin = await Admin.findOne({ email });

    if (!validAdmin) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Credentails !!" });
    }

    //console.log(validAdmin)

    const validpassword = await bcrypt.compare(password, validAdmin.password);

    console.log(validpassword);
    if (!validpassword) {
      return res.status(400).json({ message: "Wrong Credentails" });
    }

    const generateOpt = Math.floor(100000 + Math.random() * 900000).toString();

    //console.log(generateOpt);
    validAdmin.otpNumber = generateOpt;

    const generateOtpTime = Date.now() + 1000 * 60 * 5;

    validAdmin.otpExpireAt = generateOtpTime;

    //console.log(generateOtpTime)

    // console.log(validAdmin);

    await validAdmin.save();

    console.log(validAdmin);

    //await sendOtp(validAdmin.email, validAdmin.otpNumber);

    //return res.status(200).json({ email, password });

    const otpSent = await sendOtp(validAdmin.email, validAdmin.otpNumber);

    if (!otpSent) {
      return res
        .status(500)
        .json({ message: "Failed to send OTP. Try again." });
    }

    return res.status(200).json({
      message: "OTP has been sent successfully to your email",
    });
  } catch (error) {
    return res.status(400).json({ success: false, message: error });
  }
};

export const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const adminData = await Admin.findOne({ email });

    if (!adminData) {
      return res.status(400).json({ message: "Admin not found !! " });
    }

    console.log(email,otp)

    if (
      adminData.email != email ||
      adminData.otpNumber != otp ||
      adminData.otpExpireAt < Date.now()
    ) {
      return res.status(400).json({ message: "Invalid or expired Otp" });
    }

    adminData.otp = null;
    adminData.otpExpireAt = null;
    await adminData.save();

    const token = jwt.sign(
      { id: adminData._id, role: adminData.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    const { password, ...data } = adminData._doc;

    return res.status(200).json({ message: data ,token});
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};
