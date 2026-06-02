import { Router } from "express";

import * as controller from "../controller/account.ts";
import authMiddleware from "../middleware/authMiddleware.ts";

const router = Router();

router.post("/transfer", authMiddleware, controller.transfer);
export default router;
