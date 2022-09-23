import express from 'express';

import {
    getProducts,
    getProductsById,
    deleteProductsById,
    createProduct,
    updateProduct,
    createProductReview,
    getTopProducts
} from '../controllers/productControllers.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getProducts);

router.get('/top', getTopProducts);

router.get('/:id', getProductsById);

router.post('/:id/reviews', protect, createProductReview);


// For Admin
router.post('/', protect, admin, createProduct);

router.delete('/:id', protect, admin, deleteProductsById);

router.put('/:id', protect, admin, updateProduct);

export default router;
