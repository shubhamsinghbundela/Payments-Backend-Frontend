import { Router } from "express";

import * as controller from "../controller/user.ts";
import { validateData } from "../middleware/validationMiddleware.ts";
import { userSchema } from "../schema/user.ts";

const router = Router();

router.post("/signup", validateData(userSchema), controller.signup);

export default router;
