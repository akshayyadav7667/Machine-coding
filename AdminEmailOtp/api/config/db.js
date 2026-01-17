import mongoose from "mongoose";

const connectDb = async () => {
  try {
    // await mongoose.connect("mongodb://localhost:27017/adminOtp")
    await mongoose.connect(process.env.MONGODB);
    console.log("Backend Connected ");
  } catch (error) {
    console.log("Backend failed to Connected !", error);
  }
};

export default connectDb;
