import User from "../models/UserModel.js"
import { StatusCodes } from "http-status-codes"
import {hasedPassword,compareHashPassword } from "../utils/passwordUtilis.js"
import { createJWT } from "../utils/tokenUtilis.js"
import { UnauthenticatedError } from "../errors/customErrors.js"


export const register = async (req,res) => {
    // First account/user in the database get automatically make admin and rest of all users are normal Users
    const isFirstAccount = await User.countDocuments()=== 0
    req.body.role = isFirstAccount?"admin":"user"
        //Hased the Password
//   const salt = await bcrypt.genSalt(10)
//   const hasedPassword = await bcrypt.hash(req.body.password,salt)
const hashedPassword = await hasedPassword(req.body.password);
  req.body.password = hashedPassword;

    const user = await User.create(req.body)
    res.status(StatusCodes.CREATED).json({msg:"User Created Sucessfully!!"})
}

export const login = async (req,res) => {
   const user = await User.findOne({email:req.body.email})
//    if (!user) throw new UnauthenticatedError("Invalid Credentials!!!")
//   const isMatchPassword =  await compareHashPassword(req.body.password,user.password);
// if(!isMatchPassword) throw new UnauthenticatedError("Invalid Credentials!!!");
// short lines

const isValidUser  = user && (await compareHashPassword(req.body.password, user.password));

if(!isValidUser) throw new UnauthenticatedError("Invalid Credentials!!!");

const token = await createJWT({userId:user._id, role:user.role})

const oneDay = 1000*60*60*24
res.cookie("token", token, {
  httpOnly: true, // prevents access from JavaScript (protects from XSS)
  expires: new Date(Date.now() + oneDay),
  secure: process.env.NODE_ENV === "production", // use only over HTTPS
});
   res.status(StatusCodes.OK).json({ meg: "Login User sucessfully!!" });
}


export const logout = async (req,res) => {
      res.cookie('token','logout',{
        httpOnly:true,
        expires:new Date(Date.now())
      })
      res.status(StatusCodes.OK).json({msg:"User Logout sucessfully!!"})
}
