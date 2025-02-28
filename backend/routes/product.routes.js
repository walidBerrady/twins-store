import express from "express";
import { 
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
} from "../controllers/product.controller.js";

const router = express.Router();

router.get("/", getProducts); //Get all products with optional filters
router.get("/:id", getProductById); // Get product by ID
router.post("/", createProduct); // Create product
router.put("/:id", updateProduct); // Update product
router.delete("/:id", deleteProduct); // Delete product

export default router;