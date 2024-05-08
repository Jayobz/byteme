import express from "express";
import formidable from 'express-formidable'

const router = express.Router()


import { addProduct, updateProductInfo, deleteProduct, getProduct, getProductById, getAllProducts, addProductReview, getTopProducts, getNewProducts, filterProducts } from "../controllers/productController.js";

import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";
import checkId from "../middlewares/checkId.js";



router.route('/').get(getProduct).post(authenticate, authorizeAdmin, formidable(), addProduct)
router.route('/allProducts').get(getAllProducts)
router.route('/:id/reviews').post(authenticate, checkId, addProductReview)
router.get('/top', getTopProducts)
router.get('/new', getNewProducts)
router.route('/:id').get(getProductById).put(authenticate, authorizeAdmin, formidable(), updateProductInfo).delete(authenticate, authorizeAdmin, deleteProduct)
router.route('/filtered-products').post(filterProducts)


export default router;