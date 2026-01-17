import Admin from "../models/admin.js";
import bcrypt from 'bcrypt'


// this is only for register , but this is not good , admin is to regsiter , this is only made for development phase  !
export const register=async(req,res)=>{
    const {email,password}= req.body;

    try {
        if(!email || !password)
        {
            return res.status(400).json({success:false, message:"Invalid Cridentails"})
        }


        const hashedPassword= await bcrypt.hash(password,10);

        const adminData= await Admin.create({
            email,
            password:hashedPassword
        })

        return res.status(200).json({success:true,message:"Register successful", adminData})
    } catch (error) {
        return res.status(400).json({success:false,message:error})
    }
}

export const login = async(req,res)=>{

    const {email,password}=req.body;
    try {
        if(!email || !password){
            return res.status(400).json({success:false, message:"Fill all the details "})
        }

        const validAdmin= await Admin.findOne({email})

        if(!validAdmin)
        {
            return res.status(400).json({success:false,message:"Admin not found !!"})
        }
        
        // console.log(validAdmin)

        const validpassword= await bcrypt.compare(validAdmin.password,password)
        console.log(validpassword)
        return res.status(200).json({email,password})
    } catch (error) {
        
    }
}