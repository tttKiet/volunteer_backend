import express from "express";

import { adminController } from "../app/controllers";

const router = express.Router();

router.get("/create-account", adminController.createAccount);
router.get("/test/work-user", adminController.getWorkUser);

export default router;
