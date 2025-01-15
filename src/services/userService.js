// services/user.service.js
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

/**
 * Create a new user by hashing their password.
 * @param {string} email
 * @param {string} password
 * @returns {Promise<Object>} The created user record (excluding password).
 */
export async function createUser(email, password) {
  // Check if user already exists
  const existingUser = await prisma.recipie_App_User.findUnique({
    where: { email },
  });
  if (existingUser) {
    throw new Error('User already exists');
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user
  const newUser = await prisma.recipie_App_User.create({
    data: {
      email,
      password: hashedPassword,
    },
  });

  // Return user info (excluding the hashed password)
  return {
    id: newUser.id,
    email: newUser.email,
    createdAt: newUser.createdAt,
  };
}

/**
 * Find a user by email and compare password.
 * @param {string} email
 * @param {string} password
 * @returns {Promise<Object>} user info if valid credentials, else throws an error.
 */
export async function loginUser(email, password) {
  const user = await prisma.recipie_App_User.findUnique({
    where: { email },
  });
  if (!user) {
    throw new Error('Invalid email or password');
  }

  // Compare password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid email or password');
  }

  // Return user data (excluding password)
  return {
    id: user.id,
    email: user.email,
    createdAt: user.createdAt,
  };
}

/**
 * Get user profile by ID. (Example method)
 * @param {string} userId
 * @returns {Promise<Object | null>} The user data or null if not found.
 */
export async function getUserProfile(userId) {
  const user = await prisma.recipie_App_User.findUnique({
    where: { id: userId },
    select: { id: true, email: true, createdAt: true, updatedAt: true },
  });
  return user;
}
