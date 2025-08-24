import express from "express";
import { deleteProducts, getProducts, postProducts, updateProducts } from "../controllers/product.controller.js";

const router = express.Router();

router.post("/", postProducts);
router.get("/", getProducts);
router.put("/:id", updateProducts);
router.delete("/:id", deleteProducts);


export default router;