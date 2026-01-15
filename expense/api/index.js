import express from "express";
import connectDb from "./config/db.js";
import userRouter from './router/user.js'
import expenseRouter from './router/transaction.js'
import dotenv from 'dotenv'
import cookieParser from "cookie-parser";
import cors from 'cors'

dotenv.config();


const app = express();

connectDb();

const PORT = 7000;

app.use(express.json())
app.use(cookieParser())
app.use(cors({
  origin:"http://localhost:5173",
  credentials:true,
}))


app.use("/api/user",userRouter)
app.use("/api/expense",expenseRouter)


app.listen(PORT, () => {
  console.log(`Backend is running on ${PORT}`);
});
