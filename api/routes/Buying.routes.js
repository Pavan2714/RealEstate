import express from "express";
import { createBuying, getAllBuyings } from "../controllers/buying.controller.js";
import { deleteBuying } from "../controllers/buying.controller.js";

const router = express.Router();

router.post("/create", createBuying);
router.get("/", getAllBuyings);
router.delete("/:id", deleteBuying);

export default router;
