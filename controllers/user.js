import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import User from "../models/user.model.js"
import {inngest} from "../inngest"

export const signup=async (req,res)=>{
    const {email,password,skills =[]}=req.body
    try{
        const hashed = bcrypt.hash(password,10)
        const user=await User.create({email,password:hashed,skills})

        //Fire inngest event

        await inngest.send({
            name:"user/signup",
            data:{
                email
            }
        });

        const token=jwt.sign(
            {_id:user._id,role:user.role},
            process.env.JWT_SECRET
        );
    }catch(error){
            res.status(500).json({error:"Signup failed",details:error.message})
    }
}

export const login=async(req,res)=>{
    const {email,password}=req.body
    try{
        const user=User.findOne({email})
        if(!user) return res.status(401).json({error:"User not found"})

            const isMatch=await bcrypt.compare(password,user.password);

            if(!isMatch){
                return res.status(401).json({error:"Invalid credentials"})
            };

            res.json({user,token});

    }catch(error){
            res.status(500).json({error:"Signup failed",details:error.message});
    }
}

export const logout=async(req,res)=>{
    try{
        const token=req.headers.authorization.split(" ")[1]
        if(!token) return res.status(401).json({error:
            "Unauthorized"
        })
        jwt.verify(token,process.env.JWT_SECRET,(err,decoded)=>{
            if(err) return res.status(401).json({error:"Unauthorized"})
        })
    res.json({message:"Logout successfully"})
    }catch(error){
        res.status(500).json({error:"Login failed",details:error.message});
    }
}