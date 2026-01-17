import nodemailer from "nodemailer";

export const sendOtp = async (email, otp) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,       
        pass: process.env.EMAIL_PASS,  
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Your OTP Verification Code",
      html: `
        <h2>OTP Verification</h2>
        <p>Your OTP is:</p>
        <h1>${otp}</h1>
        <p>This OTP is valid for 5 minutes.</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    
    return true;
  } catch (error) {
    console.error("Error sending OTP:", error);
    return false;
  }
};
