import bcryptjs from "bcryptjs";
import User from "../models/UserModel.js";

//Create a Hashed
export const hasedPassword = async (password)=>{
    const salt = await bcryptjs.genSalt(10);
    const hasedPassword = await bcryptjs.hash(password, salt);
    return hasedPassword;
}

//Compare a Hashed password for login

export const compareHashPassword = async (password,hashedPassword) => {

    const comparePassword = await bcryptjs.compare(password, hashedPassword)
    return comparePassword
    
}