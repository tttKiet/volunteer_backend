import express from "express";

import { apiController } from "../app/controllers";

const router = express.Router();

router.get("/v1/accounts", apiController.getAccount);

export default router;
