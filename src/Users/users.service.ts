import { eq } from "drizzle-orm";
import { db } from "../drizzle/db"; 
import { TSUsers, TIUsers, Users } from "../drizzle/schema";

// Fetch all users with an optional limit
export const getAllUsersService = async (limit?: number): Promise<TSUsers[] | null> => {
    if (limit) {
        return await db.query.Users.findMany({
            limit: limit
        });
    }
    return await db.query.Users.findMany();
};

// Get a specific user by ID
export const getUserByIdService = async (id: number): Promise<TSUsers | undefined> => {
    return await db.query.Users.findFirst({
        where: eq(Users.user_id, id), // Ensure correct column name
    });
};

// Update a user by ID
export const updateUserService = async (id: number, user: TIUsers) => {
    await db.update(Users).set(user).where(eq(Users.user_id, id)).execute();
    return 'User updated successfully';
};

// Create a new user
export const createUserService = async (user: TIUsers) => {
    await db.insert(Users).values(user).execute();
    return 'User created successfully';
};

// Delete a user by ID
export const deleteUserService = async (id: number) => {
    await db.delete(Users).where(eq(Users.user_id, id)).execute();
    return 'User deleted successfully';
};
