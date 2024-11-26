import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  getInquiries,
  getInquiry,
  sendInquiry,
  updateInquiry,
} from "../controllers/inquiry.controller.js";
const router = express.Router();

router.get("/", verifyToken, getInquiries);
router.get("/:id", verifyToken, getInquiry);
router.post("/", verifyToken, sendInquiry);
router.put("/:id", verifyToken, updateInquiry);

export default router;
