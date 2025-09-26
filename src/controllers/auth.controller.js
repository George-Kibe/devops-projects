import logger from "#config/logger.js";
import { createUser, authenticateUser } from "#services/auth.service.js";
import { cookies } from "#utils/cookies.js";
import { formatValidationError } from "#utils/format.js";
import { jwttoken } from "#utils/jwt.js";
import { signUpSchema, signInSchema } from "#validations/auth.validation.js";

export const signUp = async (req, res, next) => {
  try {
    const validationResult = signUpSchema.safeParse(req.body);
    if (!validationResult.success) {
      return res.status(400).json({
        error: "validation Failed!",
        details: formatValidationError(validationResult.error),
      });
    }
    const { name, email, password, role } = validationResult.data;
    // AUTH SERVICE TO SIGN UP USER
    const user = await createUser({ name, email, password, role });
    const token = await jwttoken.sign({
      id: user.id,
      email: user.email,
      role: user.role,
    });
    cookies.set(res, "token", token);

    logger.info("User registered successfully!", { name, email, role });
    res.status(201).json({
      message: "User registered successfully!",
      user,
    });
  } catch (error) {
    logger.error("Failed to sign up user", error);
    if (error.message === "User with this email already exists") {
      return res.status(409).json({ error: error.message });
    }
    next(error);
  }
};

export const signIn = async (req, res, next) => {
  try {
    const validationResult = signInSchema.safeParse(req.body);
    if (!validationResult.success) {
      return res.status(400).json({
        error: "validation Failed!",
        details: formatValidationError(validationResult.error),
      });
    }
    const { email, password } = validationResult.data;
    // AUTH SERVICE TO SIGN IN USER
    const user = await authenticateUser({ email, password });
    const token = jwttoken.sign({
      id: user.id,
      email: user.email,
      role: user.role,
    });
    cookies.set(res, "token", token);
    logger.info("User signed in successfully!", { email });
    res.status(200).json({
      message: "User signed in successfully!",
      user,
    });
  } catch (error) {
    logger.error("Failed to sign in user", error);
    next(error);
  }
};

export const signOut = async (req, res, next) => {
  try {
    cookies.clear(res, "token");
    logger.info("User signed out successfully!");
    res.status(200).json({
      message: "User signed out successfully!",
    });
  } catch (error) {
    logger.error("Failed to sign out user", error);
    next(error);
  }
};
