import express from 'express';

import {
    authUser,
    deleteUserForAdmin,
    getUserProfile,
    getUsersByIdForAdmin,
    getUsersForAdmin,
    registerUser,
    updateUserByIdForAdmin,
    updateUserProfile
} from '../controllers/userControllers.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', registerUser);

router.get('/', protect, admin, getUsersForAdmin);

router.post('/login', authUser);

router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);

// For Admin
router
    .route('/:id')
    .delete(protect, admin, deleteUserForAdmin)
    .get(protect, admin, getUsersByIdForAdmin)
    .put(protect, admin, updateUserByIdForAdmin);

export default router;
