import express from "express";

import { apiController } from "../app/controllers";

const router = express.Router();

router.get("/v1/work/get-name", apiController.handleGetNameWork);
router.get("/v1/work/browsed", apiController.handleGetWorkBrowsed);
router.get("/v1/work", apiController.handleGetWork);
router.get("/v1/post", apiController.handleGetPost);
router.post("/v1/post", apiController.handleUpPost);
router.post("/v1/login", apiController.handleLogin);
router.patch("/v1/work-browse", apiController.handleBrowse);

export default router;
