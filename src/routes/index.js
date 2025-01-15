// routes/index.js
import { Router } from 'express';
import userRoutes from './user.routes.js';
import recipeRoutes from './recipe.routes.js';

const router = Router();

// Sub-routes
router.use('/users', userRoutes);
router.use('/recipes', recipeRoutes);

export default router;
