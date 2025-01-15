// routes/recipe.routes.js
import { Router } from 'express';
import {
  createRecipeController,
  getAllRecipesController,
  getRecipeByIdController,
  updateRecipeController,
  deleteRecipeController,
  copyRecipeController,
} from '../controllers/recipe.controller.js';

const router = Router();

// GET all public recipes or user-specific recipes
router.get('/', getAllRecipesController);

// GET a single recipe by ID
router.get('/:id', getRecipeByIdController);

// POST a new recipe
router.post('/', createRecipeController);

// PUT (update) a recipe
router.put('/:id', updateRecipeController);

// DELETE a recipe
router.delete('/:id', deleteRecipeController);

// POST copy a public recipe
router.post('/:recipeId/copy', copyRecipeController);

export default router;
