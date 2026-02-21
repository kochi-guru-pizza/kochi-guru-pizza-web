// src/controllers/authController.ts
import { Request, Response } from "express";
import User, { IUser } from "../models/User";
import { hashPassword, comparePassword } from "../utils/passwordUtils";
import jwt, { Secret, SignOptions } from "jsonwebtoken";
import config from "../config";

/**
 * Generate JWT access token
 */
const generateAccessToken = (userId: string): string => {
  if (!config.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }
  const options: SignOptions = {
    // @ts-expect-error - jsonwebtoken type definitions are incorrect for string expiresIn
    expiresIn: config.JWT_EXPIRES_IN
  };
  return jwt.sign({ id: userId }, config.JWT_SECRET as Secret, options);
};

/**
 * Generate refresh token
 */
const generateRefreshToken = (userId: string): string => {
  if (!config.REFRESH_TOKEN_SECRET) {
    throw new Error("REFRESH_TOKEN_SECRET is not defined");
  }
  const options: SignOptions = {
    // @ts-expect-error - jsonwebtoken type definitions are incorrect for string expiresIn
    expiresIn: config.REFRESH_TOKEN_EXPIRES_IN
  };
  return jwt.sign(
    { id: userId },
    config.REFRESH_TOKEN_SECRET as Secret,
    options
  );
};

/**
 * Register a new user with email and password
 */
export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "User with this email already exists" });
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      authProvider: "local",
      emailVerified: false
    });

    // Generate tokens
    const accessToken = generateAccessToken(user._id.toString());
    const refreshToken = generateRefreshToken(user._id.toString());

    // Store refresh token in database
    user.refreshTokens.push(refreshToken);

    // Enforce max sessions limit
    if (user.refreshTokens.length > config.MAX_ACTIVE_SESSIONS) {
      user.refreshTokens = user.refreshTokens.slice(
        -config.MAX_ACTIVE_SESSIONS
      );
    }

    await user.save();

    // Return user without password
    const userResponse: Partial<IUser> = user.toObject();
    delete userResponse.password;
    delete userResponse.refreshTokens;

    res.status(201).json({
      user: userResponse,
      accessToken,
      refreshToken
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "Server error during registration" });
  }
};

/**
 * Login user with email and password
 */
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Check if user is OAuth-only
    if (user.password === "OAuth") {
      return res.status(400).json({
        error: "This account uses Google Sign-In. Please continue with Google."
      });
    }

    // Verify password
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Generate tokens
    const accessToken = generateAccessToken(user._id.toString());
    const refreshToken = generateRefreshToken(user._id.toString());

    // Store refresh token in database
    user.refreshTokens.push(refreshToken);

    // Enforce max sessions limit
    if (user.refreshTokens.length > config.MAX_ACTIVE_SESSIONS) {
      user.refreshTokens = user.refreshTokens.slice(
        -config.MAX_ACTIVE_SESSIONS
      );
    }

    await user.save();

    // Return user without password
    const userResponse: Partial<IUser> = user.toObject();
    delete userResponse.password;
    delete userResponse.refreshTokens;

    res.status(200).json({
      user: userResponse,
      accessToken,
      refreshToken
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Server error during login" });
  }
};

/**
 * Refresh access token using refresh token
 */
export const refreshAccessToken = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;

    if (!config.REFRESH_TOKEN_SECRET) {
      throw new Error("REFRESH_TOKEN_SECRET is not defined");
    }

    // Verify refresh token
    const decoded = jwt.verify(
      refreshToken,
      config.REFRESH_TOKEN_SECRET as string
    ) as { id: string };

    // Find user
    const user = await User.findById(decoded.id);

    // Check if user exists and if the token is in the allowed list
    if (!user || !user.refreshTokens.includes(refreshToken)) {
      return res.status(401).json({ error: "Invalid refresh token" });
    }

    // Generate NEW tokens (Rotate)
    const newAccessToken = generateAccessToken(user._id.toString());
    const newRefreshToken = generateRefreshToken(user._id.toString());

    // Replace old refresh token with new one
    // We filter out the old one and push the new one to handle the rotation securely
    user.refreshTokens = user.refreshTokens.filter((rt) => rt !== refreshToken);
    user.refreshTokens.push(newRefreshToken);

    await user.save();

    res.status(200).json({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken
    });
  } catch (error) {
    console.error("Refresh token error:", error);
    res.status(401).json({ error: "Invalid or expired refresh token" });
  }
};

/**
 * Logout user (invalidate refresh token)
 */
export const logout = async (req: Request, res: Response) => {
  try {
    const user = req.user as IUser;
    const { refreshToken } = req.body;

    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    if (refreshToken) {
      // Remove specific refresh token
      await User.findByIdAndUpdate(user._id, {
        $pull: { refreshTokens: refreshToken }
      });
    }

    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error);
    // Even if error, we want the client to clear local tokens
    res.status(200).json({ message: "Logged out" });
  }
};

/**
 * Handle Google OAuth callback
 */
export const googleCallback = async (req: Request, res: Response) => {
  try {
    const user = req.user as IUser;

    if (!user) {
      return res.redirect(`${config.FRONTEND_URL}?error=auth_failed`);
    }

    // Generate tokens
    const accessToken = generateAccessToken(user._id.toString());
    const refreshToken = generateRefreshToken(user._id.toString());

    // Store refresh token in database
    user.refreshTokens.push(refreshToken);

    // Enforce max sessions limit
    if (user.refreshTokens.length > config.MAX_ACTIVE_SESSIONS) {
      user.refreshTokens = user.refreshTokens.slice(
        -config.MAX_ACTIVE_SESSIONS
      );
    }

    await user.save();

    // Redirect to frontend with tokens
    res.redirect(
      `${config.FRONTEND_URL}/auth/callback?accessToken=${accessToken}&refreshToken=${refreshToken}`
    );
  } catch (error) {
    console.error("Google callback error:", error);
    res.redirect(`${config.FRONTEND_URL}?error=auth_failed`);
  }
};

/**
 * Get current authenticated user
 */
export const getCurrentUser = async (req: Request, res: Response) => {
  try {
    const user = req.user as IUser;

    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Return user without password
    const userResponse: Partial<IUser> = user.toObject();
    delete userResponse.password;
    delete userResponse.refreshTokens;

    res.status(200).json(userResponse);
  } catch (error) {
    console.error("Get current user error:", error);
    res.status(500).json({ error: "Server error" });
  }
};
