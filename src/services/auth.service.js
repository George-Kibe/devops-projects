import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";
import logger from "#config/logger.js";
import { db } from "#config/database.js";
import {users} from "#models/user.model.js";

export const hashPassword = async (password) => {
  try {
    return await bcrypt.hash(password, 10);
  } catch (error) {
    logger.error(`Error hashing he password: ${error}`);
    throw new Error("Failed to hash password");
  }
};

export const comparePassword = async (password, hashedPassword) => {
  try {
    return await bcrypt.compare(password, hashedPassword);
  } catch (error) {
    logger.error(`Error comparing the password: ${error}`);
    throw new Error("Failed to compare password");
  }
};

export const createUser = async({name, email, password, role="user"}) =>{
  try {
    const existingUser = db.select().from(users).where(eq(users.email, email)).limit(1);
    if (existingUser.length > 0) {
      throw new Error("User with this email already exists");
    }
    const hashedPassword = await hashPassword(password);
    const [ newUser ] = await db.insert(users).values({
      name,
      email,
      password: hashedPassword,
      role
    }).returning({
      id: users.id,
      name: users.name,
      email: users.email,
      role: users.role
    });
    logger.info(`User ${newUser.email} created successfully!`);
    return newUser;
  } catch (error) {
    logger.error(`Error creating user: ${error}`);
    throw new Error("Failed to create user");
  }
};