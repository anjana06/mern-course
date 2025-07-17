import { body,param,validationResult } from "express-validator";
import { BadRequestError, NoFoundError, UnauthorizedError } from "../errors/customErrors.js";
import { JOB_STATUS, JOB_TYPE } from "../utils/constant.js";
import mongoose from "mongoose";
import Job from "../models/JobModel.js";
import User from "../models/UserModel.js"


const withvalidationErrors = (validateValues)=>{
    return [validateValues,(req,res,next)=>{
        const errors = validationResult(req)
       //  console.log(errors);
        if(!errors.isEmpty()){
         const errorMessages = errors.array().map((error)=>error.msg)
         console.log(errorMessages[0]);
         
         if (errorMessages[0].startsWith("Job id")){
          throw new NoFoundError(errorMessages);
         }
         if (errorMessages[0].startsWith("not authroized")){
          throw new UnauthorizedError("not authroized request");
         }
           throw new BadRequestError(errorMessages);
        }
    next()
},]
}

export const validateTest = withvalidationErrors([
  body("name")
    .notEmpty()
    .withMessage("name is required")
    .isLength({ min: 3,max:50 })
    .withMessage("name must be between 3 and 50 characters long").trim()
]);

export const ValidateJobInput = withvalidationErrors([
  body("company").notEmpty().withMessage("Company is required"),
  body("position").notEmpty().withMessage("position is required"),
  body("jobLocation").notEmpty().withMessage("job Location is required"),
  body("jobStatus").isIn(Object.values(JOB_STATUS)).withMessage("Invalid status value"),
  body("jobType").isIn(Object.values(JOB_TYPE)).withMessage("Invalid Type value")

]);

export const validateIdparam = withvalidationErrors([
  param("id")
    .custom(async (value,{req}) =>{ 
      const isValidId = mongoose.Types.ObjectId.isValid(value);
      // if(!isValidId) throw new BadRequestError("Invalid monogo DB ID"); we already mentioned in validationError function line no. 17 and 19
      if (!isValidId) throw new Error("Invalid monogo DB ID");
      const job = await Job.findById(value);
      // if (!job) throw new NoFoundError(`Job id ${value} is not found`);
      if (!job) throw new Error(`Job id ${value} is not found`);
      const isAdmin = req.user.role === 'admin'
      const isOwner = req.user.userId === job.createdBy.toString()
      // console.log(isAdmin, isOwner);
      
      if(!isAdmin && !isOwner) throw new Error("not authroized request")
     }
    )
]);

export const validateRegisterInput = withvalidationErrors([
  body("name").notEmpty().withMessage("name is required!"),
  body("email").notEmpty().withMessage("email is required!").isEmail().withMessage("Invalide email format!").custom(async(email)=>{
    const user = await User.findOne({email})
    if(user){
        throw new Error("Email Already Exists!!")
    }
  }),
  body("password").notEmpty().withMessage("password is required!").isLength({min:8}).withMessage("password must be at least 8 character long"),
  body("lastname").notEmpty().withMessage("lastname is required!"),
  body("location").notEmpty().withMessage("location is required!"),
]);

export const validateLoginInput = withvalidationErrors([
  body("email")
    .notEmpty()
    .withMessage("email is required!")
    .isEmail()
    .withMessage("Invalide email format!"),
  body("password").notEmpty().withMessage("password is required!")
]);

export const validateUpdateUserInput = withvalidationErrors([
  body("name").notEmpty().withMessage("name is required!"),
  body("email")
    .notEmpty()
    .withMessage("email is required!")
    .isEmail()
    .withMessage("Invalide email format!")
    .custom(async (email,{req}) => {
      const user = await User.findOne({ email });
      if (user && user._id.toString() !== req.user.userId) {
        throw new Error("Email Already Exists!!");
      }
    }),
  body("lastname").notEmpty().withMessage("lastname is required!"),
  body("location").notEmpty().withMessage("location is required!"),
]);
