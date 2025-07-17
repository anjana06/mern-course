import {Router} from "express"
import {  getCurrentUser, getApplicationUser, updateUser,} from "../controllers/userController.js";
import { validateUpdateUserInput } from "../middleware/validatationMiddleware.js";
import {
  authorizePermissions,
  checkForTestUser,
} from "../middleware/authMiddleware.js";
import { upload } from "../middleware/multerMiddleware.js";


const router = Router()

router.route("/current-user").get(getCurrentUser)
router.route("/admin/app-stats").get([authorizePermissions('admin'),getApplicationUser]);
router
  .route("/update-user")
  .patch(
    checkForTestUser,
    upload.single("avatar"),
    validateUpdateUserInput,
    updateUser
  );

export default router