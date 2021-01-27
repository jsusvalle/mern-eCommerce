import express from 'express';
const router = express.Router();
import {authUser, registerUser, getUserProfile, updateUserProfile, getUsers} from '../controllers/userController.js';
import { protect, adminAuth } from '../middleware/authMiddleware.js';

router.route('/').post(registerUser).get(protect, adminAuth, getUsers);
router.post('/login', authUser);
router.route('/profile').get(protect, getUserProfile)
                        .put(protect, updateUserProfile)

export default router;