import { StatusCodes } from "http-status-codes";

export const errorHandleMiddleware =  (err,req,res,next)=>{
    const StatusCode = err.StatusCode || StatusCodes.INTERNAL_SERVER_ERROR;
    const msg = err.message || "Something went wrong please try again later"
// console.log(StatusCode, msg,req.file);

    res.status(StatusCode).json({ msg });
 }