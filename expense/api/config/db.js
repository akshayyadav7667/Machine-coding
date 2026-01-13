import mongoose from "mongoose";

const connectDb= async()=>{
    try {
        mongoose.connect("mongodb://localhost:27017/Expense")

        console.log(`Backend is connected`)
    } catch (error) {
        console.log("Backend is not Connected ! Failed ",error)
    }
}

export default connectDb