import { TSUsers, Users, Authentication } from "../drizzle/schema";
import { db } from "../drizzle/db";
import { sql } from "drizzle-orm";
import jwt from 'jsonwebtoken';

import bcrypt from 'bcrypt'; // Ensure bcrypt is installed

// Service to create a new user with authentication details
export const createAuthUserService = async (user: TSUsers, password: string): Promise<string | null> => {
    // Check if a user with the same email already exists
    const existingUser = await db.query.Users.findFirst({
        where: sql`${Users.email} = ${user.email}`,
    });

    if (existingUser) {
        throw new Error("User with this email already exists");
    }

    // Insert the new user into the Users table
    const [newUser] = await db.insert(Users).values({
        full_name: user.full_name,
        email: user.email,
        contact_phone: user.contact_phone,
        address: user.address,
        role: user.role,
        department_id: user.department_id,
    }).returning({
        user_id: Users.user_id, // Returning the inserted user's ID
    });

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10); // You need to hash the password

    // Insert the user into the Authentication table with password hash
    await db.insert(Authentication).values({
        user_id: newUser.user_id, // Using the user_id from the new user
        password_hash: hashedPassword, // Storing the hashed password
    });

    return "User created successfully";
};

// Secret for JWT, use environment variable for security in production
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Service to log in a user
export const userLoginService = async (email: string, password: string) => {
    // Fetch user details including the password hash for verification
    const existingUser = await db.query.Users.findFirst({
        columns: {
            user_id: true,
            full_name: true,
            email: true,
            role: true,
        },
        where: sql`${Users.email} = ${email}`,
        with: {
            authentication: {
                columns: {
                    password_hash: true,
                },
            },
        },
    });

    if (!existingUser || !existingUser.authentication) {
        throw new Error("Invalid login credentials");
    }

    // Compare the hashed password
    const isPasswordValid = await comparePassword(password, existingUser.authentication.password_hash);
    if (!isPasswordValid) {
        throw new Error("Invalid login credentials");
    }

    // Generate JWT token
    const token = jwt.sign(
        {
            user_id: existingUser.user_id,
            full_name: existingUser.full_name,
            email: existingUser.email,
            role: existingUser.role,
        },
        JWT_SECRET,
        { expiresIn: '1h' } // Token expires in 1 hour
    );

    // Return user details and the generated token
    return {
        token,
        user: {
            user_id: existingUser.user_id,
            full_name: existingUser.full_name,
            email: existingUser.email,
            role: existingUser.role,
        },
    };
};

// Helper function for password comparison
async function comparePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(plainPassword, hashedPassword);
}