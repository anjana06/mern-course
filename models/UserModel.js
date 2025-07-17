import mongoose from "mongoose";
import { type } from "os";

const UserSchema = new mongoose.Schema({
  name: String,
  email:String,
  password:String,
  lastname:{
    type:String,
    default:"lastName"
  },
  location:{
    type:String,
    default:"My city"
  },
  role:{
    type:String,
    enum:["user","admin"],
    default:"user"
  },
  avatar:String,
  avatarPublicId:String
});

UserSchema.methods.toJson = function () {
  let obj = this.toObject()
  delete obj.password
  return obj
};
const userModel = new mongoose.model("user",UserSchema)

export default userModel;
