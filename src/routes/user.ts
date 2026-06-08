import { Router } from "express";

import * as controller from "../controller/user.ts";
import { validateData } from "../middleware/validationMiddleware.ts";
import { userSigninSchema, userSignupSchema } from "../schema/user.ts";
import authMiddleware from "../middleware/authMiddleware.ts";

const router = Router();

router.post("/signup", validateData(userSignupSchema), controller.signup);
router.post("/signin", validateData(userSigninSchema), controller.signin);
router.post("/refresh", controller.refresh);
router.get("/getme", authMiddleware, controller.getMe);
router.post("/logout", authMiddleware, controller.logout);
router.get("/getAllUsers", authMiddleware, controller.getAllUsers);

export default router;
