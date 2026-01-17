import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import adminRouter from "./routes/admin.js";
import cors from "cors";
dotenv.config();

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "https://frontend-admin-otp.onrender.com",
    credentials: true,
  })
);
const PORT = process.env.PORT || 5000;

connectDb();

app.use("/api/admin", adminRouter);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
