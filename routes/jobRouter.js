
import { Router } from "express";
import {GetAllJobs,EditJob,CreateJob,DeleteJob,GetSingleJob, showStats} from "../controllers/jobController.js"
import {ValidateJobInput,validateIdparam } from "../middleware/validatationMiddleware.js";
import { checkForTestUser } from "../middleware/authMiddleware.js";


const router = Router()


router
  .route("/")
  .get(GetAllJobs)
  .post(checkForTestUser,ValidateJobInput, CreateJob);
  
  router.route('/stats').get(showStats)
router
  .route("/:id")
  .get(validateIdparam, GetSingleJob)
  .patch(checkForTestUser, ValidateJobInput, validateIdparam, EditJob)
  .delete(checkForTestUser, validateIdparam, DeleteJob);

export default router;