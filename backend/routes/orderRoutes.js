import express from "express";
const router = express.Router()

import { createOrder, getAllOrders, getUserOrders, countingtotalOrders, calculateTotalSales, calculateTotalSalesByDate, findOrderById, markOrderPaid, markOrderDelivered } from "../controllers/orderController.js";

import { authenticate, authorizeAdmin } from '../middlewares/authMiddleware.js'


router.route('/').post(authenticate, createOrder).get(authenticate, authorizeAdmin, getAllOrders)
router.route('/mine').get(authenticate, getUserOrders)
router.route('/total-orders').get(countingtotalOrders)
router.route('/total-sales').get(calculateTotalSales)
router.route('total-sales-by-date').get(calculateTotalSalesByDate)
router.route('/:id').get(authenticate, findOrderById)
router.route('/:id/pay').put(authenticate, markOrderPaid)
router.route(':id/deliver').put(authenticate, authorizeAdmin, markOrderDelivered)


export default router;