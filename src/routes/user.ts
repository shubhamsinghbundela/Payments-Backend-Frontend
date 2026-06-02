import { Router } from "express";

import * as controller from "../controller/user.ts";
import { validateData } from "../middleware/validationMiddleware.ts";
import { userSigninSchema, userSignupSchema } from "../schema/user.ts";

const router = Router();

router.post("/signup", validateData(userSignupSchema), controller.signup);
router.post("/signin", validateData(userSigninSchema), controller.signin);
router.post("/refresh", controller.refresh);

export default router;
