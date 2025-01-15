// routes/user.routes.js
import { Router } from 'express';
import {
  userSignUpController,
  userLoginController,
  getUserProfileController,
} from '../controllers/user.controller.js';

const router = Router();

// POST /users/signup
router.post('/signup', userSignUpController);

// POST /users/login
router.post('/login', userLoginController);

// GET /users/profile
// Could be protected by auth middleware in a real application
router.get('/profile', getUserProfileController);

export default router;
