import Transaction from "../models/Transaction.js";
import User from "../models/user.js";

export const addTransaction = async (req, res) => {
  const { id } = req.user;
  const { amount, type, category, date, description } = req.body;

  try {
    
    if (!id) {
      return res.status(400).json({ message: "Invalid user id" });
    }

    
    if (!amount || !type || !category || !date || !description) {
      return res.status(400).json({ message: "Fill all the details !!" });
    }

    if (amount <= 0) {
      return res.status(400).json({ message: "Amount must be greater than 0" });
    }

    // if (!["income", "expense"].includes(type)) {
    //   return res.status(400).json({ message: "Invalid transaction type" });
    // }

    
    const existingUser = await User.findById(id).select("-password");
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    
    const transaction = await Transaction.create({
      userId: id,
      amount,
      type,
      category,
      date: new Date(date),
      description,
    });

    return res.status(201).json({
      message: "Transaction added successfully",
      transaction,
    });

  } catch (error) {
    console.error("Add transaction error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


export const getAllTransaction=async(req,res)=>{

    const id= req.user.id;
    try {
        const data= await Transaction.find({userId:id});

        console.log(data)

        return res.status(200).json({data});

    } catch (error) {
        return res.status(400).json("failed to load records")
    }

}


export const updateTransaction=async(req,res)=>{
    const {Tid}= req.params;


    
    try {

      

      const transaction = await Transaction.findById(Tid);

      console.log(transaction)
        console.log(Tid)

        return res.status(200).json("Updated");
    } catch (error) {
        return res.status(400).json(error)
    }
}