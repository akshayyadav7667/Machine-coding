import express from "express";
import connectDb from "./config/db.js";
import userRouter from './router/user.js'
import expenseRouter from './router/transaction.js'
import dotenv from 'dotenv'
import cookieParser from "cookie-parser";

const app = express();

connectDb();
dotenv.config();

const PORT = 6000;

app.use(express.json())
app.use(cookieParser())


app.use("/api/user",userRouter)
app.use("/api/expense",expenseRouter)


app.listen(PORT, () => {
  console.log(`Backend is running on ${PORT}`);
});
