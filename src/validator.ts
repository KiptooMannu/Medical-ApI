import { z } from 'zod';

// Enums
const roleEnumSchema = z.enum(["patient", "doctor", "nurse", "staff", "admin"]);
const appointmentStatusEnumSchema = z.enum(["Scheduled", "Completed", "Cancelled"]);
const paymentStatusEnumSchema = z.enum(["Pending", "Paid", "Overdue"]);
const ticketStatusEnumSchema = z.enum(["Open", "In Progress", "Resolved", "Closed"]);

// User Schema
export const userSchema = z.object({
    fullname: z.string().nonempty(),
    email: z.string().email(),
    password: z.string().min(6),
    contact_phone: z.string().optional(),
    phone_verified: z.boolean().optional(),
    email_verified: z.boolean().optional(),
    confirmation_code: z.string().optional(),
});

// Authentication Schema
export const authOnUsersSchema = userSchema.extend({
    role: roleEnumSchema.optional(),
});

export const loginUserSchema = z.object({
    username: z.string(),
    password: z.string().min(6),
});

export const registerUserSchema = z.object({
    user_id: z.number(),
    username: z.string(),
    password: z.string(),
    role: roleEnumSchema.optional(),
});

