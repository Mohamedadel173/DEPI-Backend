import express from "express";
import { createLevel, getAllLevels, getLevelDetails } from "../controllers/levelController.js";
import { verifyToken, verifyPurchase, verifyAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create", verifyToken, verifyAdmin, createLevel);
router.get("/levels", verifyToken, getAllLevels);
router.get("/:levelId", verifyToken, verifyPurchase, getLevelDetails);


export default router;
