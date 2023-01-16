import express from "express";
import { siteController } from "../app/controllers";

const router = express.Router();

router.get("/", siteController.index);
router.get("/admin/create-account", siteController.about);

export default router;
