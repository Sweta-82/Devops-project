import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { blacklistModel } from "../models/blacklist.model.js";
import { get } from "mongoose";
/**
 * @name registerUserController
 * @description Register a new user, expect username, email and password
 * @access Public
 */

export async function registerUserController(req,res){
    const {username, email, password}= req.body;
    if(!username || !email || !password){
        return res.status(400).json({
            message:"Please provide username, email and password"
        })
    }

    const isUserAlreadyExits= await userModel.findOne({
        $or: [{username}, {email}]
    })

    if(isUserAlreadyExits){
        return res.status(400).json({
            message:"Account already exists with this email address or username"
        })
    }
    
    const hash= await bcrypt.hash(password, 10)
    const newUser= new userModel({
        username,
        email,
        password: hash
    })
    await newUser.save();

    const token= jwt.sign(
        {id: newUser.id, username: newUser.username},
        process.env.JWT_SECRET,
        {expiresIn: "1d"}
    )
    res.cookie("token", token)
    res.status(201).json({
        message:"User registered successfully",
        user:{
            id: newUser._id,
            username: newUser.username,
            email: newUser.email,
        }
    })
    
}



/**
 * @name loginUserController
 * @description login a user, experts email and password in the request body
 * @access Public
 * 
 */
export async function loginUserController(req, res) {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
        return res.status(400).json({
            message: "Invalid email or password"
        });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res.status(400).json({
            message: "Invalid email or password"
        });
    }

    const token = jwt.sign(
        { id: user._id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    );

    res.cookie("token", token);

    res.status(200).json({
        message: "User logged in successfully.",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    });
}

/**
 * @name logoutUserController
 * @description Logout a user by clearing the token cookie and adding the token to the blacklist
 * @access Public   
 */
export async function logoutUserController(req,res){
    const token= req.cookies.token;
    if(token){
        await blacklistModel.create({token});
    }
    res.clearCookie("token");
    res.status(200).json({
        message:"User logged out successfully"
    })
}

/**
 * @name getMeController
 * @description Get the currently logged in user's information
 * @access Private  
 */
export async function getMeController(req,res){
    const user=await userModel.findById(req.user.id);
    res.status(200).json({
        message:"User information retrieved successfully",
        user:{
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
}


