import express from "express";
import {
  createRental,
  getAllRentals,
} from "../controllers/rental.controller.js";
import { deleteRental } from "../controllers/rental.controller.js";

const router = express.Router();

router.post("/create", createRental);
router.get("/", getAllRentals);
router.delete("/:id", deleteRental);

export default router;
