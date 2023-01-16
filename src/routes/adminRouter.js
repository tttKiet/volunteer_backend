import express from "express";

import { adminController } from "../app/controllers";

const router = express.Router();

router.get("/create-account", adminController.createAccount);

export default router;
