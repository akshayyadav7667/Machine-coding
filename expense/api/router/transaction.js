import express from "express";
import {
  addTransaction,
  getAllTransaction,
  updateTransaction,
} from "../controllers/transaction.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/add", auth, addTransaction);

router.get("/", auth, getAllTransaction);
router.patch("/update/:Tid", auth, updateTransaction);

export default router;
