import { BadRequestError, UnauthenticatedError, UnauthorizedError } from "../errors/customErrors.js";
import { verifyJWT } from "../utils/tokenUtilis.js";

export const authenticateUser = (req,res,next) => {
    // console.log(req.cookies);
    const {token} = req.cookies
    if (!token) throw new UnauthenticatedError ("Authentication invalid")
        try {
            const {userId,role} = verifyJWT(token)
            const testUser = userId === "686e053029c41268da6fedad";
            req.user = { userId, role, testUser };
            // console.log(user);
            
            next();
        } catch (error) {
            throw new UnauthenticatedError("Authentication invalid");
        }

}

export const checkForTestUser = (req,res,next)=>{
    if(req.user.testUser) throw new BadRequestError("Demo User. Read Only!")
        next()
}

export const authorizePermissions = (...roles)=>{
    return (req, res, next) => {
        if(!roles.includes(req.user.role)) throw new UnauthorizedError("unauthroized to access the router")
    //   console.log(roles);
    next();
    };

}
