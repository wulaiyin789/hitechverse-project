import express from 'express';

import {
    addOrderItems,
    deleteOrderForAdmin,
    getMyOrders,
    getOrderById,
    getOrdersForAdmin,
    updateOrderToDelivered,
    updateOrderToPaid
} from '../controllers/orderControllers.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(protect, addOrderItems);

router.route('/myorders').get(protect, getMyOrders);

router.route('/:id').get(protect, getOrderById);

router.route('/:id/pay').put(protect, updateOrderToPaid);

// For Admin
router.route('/').get(protect, admin, getOrdersForAdmin);

router.route('/:id').delete(protect, admin, deleteOrderForAdmin);

router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered);


export default router;
