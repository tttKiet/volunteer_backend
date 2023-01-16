import express from "express";

import { apiController } from "../app/controllers";

const router = express.Router();

router.get("/v1/accounts", apiController.getAccount);
router.post("/v1/login", apiController.handleLogin);

export default router;
