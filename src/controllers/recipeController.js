// controllers/recipe.controller.js
import * as recipeService from '../services/recipe.service.js';

/**
 * Controller: Create a new recipe
 */
export async function createRecipeController(req, res) {
  try {
    // Typically, userId could come from a JWT or session. Here we read from body for simplicity.
    const userId = req.body.userId;
    const recipeData = req.body; // e.g., { title, description, isPublic, parentRecipeId, directions }

    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    const createdRecipe = await recipeService.createRecipe(userId, recipeData);

    return res.status(201).json({
      message: 'Recipe created successfully',
      data: createdRecipe,
    });
  } catch (error) {
    console.error('Error creating recipe:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

/**
 * Controller: Get all public recipes or user-specific recipes
 */
export async function getAllRecipesController(req, res) {
  try {
    // If a userId is provided, fetch that user's recipes only; else fetch public recipes.
    const userId = req.query.userId; // optional
    const recipes = await recipeService.getAllRecipes(userId);
    return res.status(200).json({ data: recipes });
  } catch (error) {
    console.error('Error fetching recipes:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

/**
 * Controller: Get a single recipe by ID
 */
export async function getRecipeByIdController(req, res) {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: 'Recipe ID is required' });
    }

    const recipe = await recipeService.getRecipeById(id);
    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }

    return res.status(200).json({ data: recipe });
  } catch (error) {
    console.error('Error fetching recipe:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

/**
 * Controller: Update a recipe by ID (if user is owner)
 */
export async function updateRecipeController(req, res) {
  try {
    const { id } = req.params; // ID of the recipe
    const userId = req.body.userId; // ID of the user (e.g., from JWT or request body)
    const updates = req.body; // { title, description, isPublic, etc. }

    if (!id || !userId) {
      return res.status(400).json({ error: 'Recipe ID and User ID are required' });
    }

    const updatedRecipe = await recipeService.updateRecipe(id, userId, updates);
    if (!updatedRecipe) {
      return res.status(404).json({ error: 'Recipe not found or not owned by user' });
    }

    return res.status(200).json({
      message: 'Recipe updated successfully',
      data: updatedRecipe,
    });
  } catch (error) {
    console.error('Error updating recipe:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

/**
 * Controller: Delete a recipe by ID (if user is owner)
 */
export async function deleteRecipeController(req, res) {
  try {
    const { id } = req.params; // Recipe ID
    const userId = req.body.userId; // e.g., from JWT or request body

    if (!id || !userId) {
      return res.status(400).json({ error: 'Recipe ID and User ID are required' });
    }

    const deleted = await recipeService.deleteRecipe(id, userId);
    if (!deleted) {
      return res.status(404).json({ error: 'Recipe not found or not owned by user' });
    }

    return res.status(200).json({ message: 'Recipe deleted successfully' });
  } catch (error) {
    console.error('Error deleting recipe:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

/**
 * Controller: Copy a public recipe
 */
export async function copyRecipeController(req, res) {
  try {
    const { recipeId } = req.params; // ID of the public recipe to copy
    const userId = req.body.userId;

    if (!recipeId || !userId) {
      return res.status(400).json({ error: 'Recipe ID and User ID are required' });
    }

    const copiedRecipe = await recipeService.copyRecipe(recipeId, userId);
    if (!copiedRecipe) {
      return res.status(404).json({ error: 'Cannot copy this recipe' });
    }

    return res.status(201).json({
      message: 'Recipe copied successfully',
      data: copiedRecipe,
    });
  } catch (error) {
    console.error('Error copying recipe:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
