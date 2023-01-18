import express from "express";
import {
	deleteProduct,
	getProduct,
	getProductById,
	saveProduct,
	updateProduct
} from "../controller/ProductController.js";

const router = express.Router()


router.get('/product', getProduct)
router.post('/product', saveProduct)
router.get('/product:id', getProductById)
router.patch('/product/:id', updateProduct)
router.delete('/product/:id', deleteProduct)

export default router