// controllers/user.controller.js
import * as userService from '../services/user.service.js';

/**
 * POST /users/signup
 */
export async function userSignUpController(req, res) {
  try {
    const { email, password } = req.body;

    // Basic validation
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const createdUser = await userService.createUser(email, password);

    return res.status(201).json({
      message: 'User created successfully',
      data: createdUser,
    });
  } catch (error) {
    console.error('Error signing up user:', error);
    if (error.message === 'User already exists') {
      return res.status(409).json({ error: 'User already exists' });
    }
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

/**
 * POST /users/login
 */
export async function userLoginController(req, res) {
  try {
    const { email, password } = req.body;

    // Basic validation
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const userData = await userService.loginUser(email, password);

    // If you have JWT, you'd generate a token here
    // const token = generateToken(userData.id);

    return res.status(200).json({
      message: 'Login successful',
      data: userData,
      // token,
    });
  } catch (error) {
    console.error('Error logging in user:', error);
    if (error.message === 'Invalid email or password') {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

/**
 * GET /users/profile
 * Example protected route: you'd typically require a valid token to get userId
 */
export async function getUserProfileController(req, res) {
  try {
    // In a real-world scenario, userId might be extracted from a JWT
    const userId = req.query.userId; // or req.user.id, etc.

    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    const userProfile = await userService.getUserProfile(userId);
    if (!userProfile) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.status(200).json({
      message: 'User profile fetched successfully',
      data: userProfile,
    });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
