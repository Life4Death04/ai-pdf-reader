/**
 * User Service - Business logic for user operations
 * 
 * Handles user management including:
 * - Getting or creating default user
 * - User lookup
 */

import type { PrismaClient, User } from "../../generated/prisma";

/**
 * Get or create the default user for single-user mode.
 * 
 * In the current single-user setup, we maintain one default user.
 * This will be replaced by proper authentication in the future.
 * 
 * @param email - User's email (from environment or default)
 * @param prisma - Prisma client instance
 * @returns The default user
 */
export async function getOrCreateDefaultUser(
  email: string,
  prisma: PrismaClient
): Promise<User> {
  // Try to find existing user
  const existing = await prisma.user.findUnique({ where: { email } });
  
  if (existing) {
    return existing;
  }

  // Create new user if doesn't exist
  return prisma.user.create({
    data: { email },
  });
}

/**
 * Get user by email.
 * 
 * @param email - User's email
 * @param prisma - Prisma client instance
 * @returns User or null if not found
 */
export async function getUserByEmail(
  email: string,
  prisma: PrismaClient
): Promise<User | null> {
  return prisma.user.findUnique({ where: { email } });
}

/**
 * Get user by ID.
 * 
 * @param userId - User's ID
 * @param prisma - Prisma client instance
 * @returns User or null if not found
 */
export async function getUserById(
  userId: string,
  prisma: PrismaClient
): Promise<User | null> {
  return prisma.user.findUnique({ where: { id: userId } });
}
