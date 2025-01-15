// services/recipe.service.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Create a new recipe.
 * @param {string} userId - The ID of the user creating the recipe.
 * @param {Object} recipeData - The data for the new recipe.
 * @returns {Promise<Object>} - The created recipe.
 */
export async function createRecipe(userId, recipeData) {
  const { title, description, isPublic, parentRecipeId, directions } = recipeData;

  const newRecipe = await prisma.recipie_App_Recipe.create({
    data: {
      title,
      description,
      isPublic: isPublic || false,
      parentRecipeId: parentRecipeId || null,
      userId,
      directions: {
        create:
          directions?.map((dir, index) => ({
            stepNumber: dir.stepNumber || index + 1,
            instruction: dir.instruction,
          })) || [],
      },
    },
    include: {
      directions: true,
    },
  });

  return newRecipe;
}

/**
 * Fetch all recipes:
 * - If userId is provided, return that user's recipes (both public & private).
 * - If no userId, return only public recipes.
 */
export async function getAllRecipes(userId) {
  if (userId) {
    // Get all recipes owned by this user (public and private)
    return await prisma.recipie_App_Recipe.findMany({
      where: { userId },
      include: { directions: true },
    });
  } else {
    // Return only public recipes
    return await prisma.recipie_App_Recipe.findMany({
      where: { isPublic: true },
      include: { directions: true },
    });
  }
}

/**
 * Get a single recipe by ID.
 * Only return if it's public or if we don't care about ownership checks here.
 */
export async function getRecipeById(id) {
  // In a more secure scenario, you might check if the user is owner if recipe is private, etc.
  const recipe = await prisma.recipie_App_Recipe.findUnique({
    where: { id },
    include: { directions: true },
  });
  return recipe;
}

/**
 * Update a recipe if the user is the owner.
 */
export async function updateRecipe(id, userId, updates) {
  // Check if recipe belongs to the user
  const existing = await prisma.recipie_App_Recipe.findUnique({
    where: { id },
  });
  if (!existing || existing.userId !== userId) {
    return null; // not found or not owned
  }

  // Update the recipe
  const updatedRecipe = await prisma.recipie_App_Recipe.update({
    where: { id },
    data: {
      title: updates.title ?? existing.title,
      description: updates.description ?? existing.description,
      isPublic: typeof updates.isPublic === 'boolean' ? updates.isPublic : existing.isPublic,
      updatedAt: new Date(),
      // Directions update could be more complex (add, remove steps, etc.)
      // This is a simplified example
    },
    include: {
      directions: true,
    },
  });

  return updatedRecipe;
}

/**
 * Delete a recipe if the user is the owner.
 */
export async function deleteRecipe(id, userId) {
  // Check if recipe belongs to the user
  const existing = await prisma.recipie_App_Recipe.findUnique({
    where: { id },
  });
  if (!existing || existing.userId !== userId) {
    return false;
  }

  await prisma.recipie_App_Recipe.delete({ where: { id } });
  return true;
}

/**
 * Copy a recipe if it is public. New recipe belongs to the new user.
 */
export async function copyRecipe(recipeId, userId) {
  // Fetch the recipe
  const existing = await prisma.recipie_App_Recipe.findUnique({
    where: { id: recipeId },
    include: {
      directions: true,
    },
  });
  if (!existing || !existing.isPublic) {
    return null; // can't copy private or non-existing recipe
  }

  // Create a new recipe with the same data, referencing the original as parent
  const copiedRecipe = await prisma.recipie_App_Recipe.create({
    data: {
      title: existing.title + ' (Copy)',
      description: existing.description,
      isPublic: false, // your choice if copies should default to private
      parentRecipeId: existing.id,
      userId,
      directions: {
        create: existing.directions.map((dir) => ({
          stepNumber: dir.stepNumber,
          instruction: dir.instruction,
        })),
      },
    },
    include: {
      directions: true,
    },
  });

  return copiedRecipe;
}
