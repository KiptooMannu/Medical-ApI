import { eq } from "drizzle-orm";
import { db } from "../drizzle/db"; 
import { TSPayments, TIPayments, Payments } from "../drizzle/schema";

// Fetch all payments with an optional limit
export const getAllPaymentsService = async (limit?: number): Promise<TSPayments[] | null> => {
    if (limit) {
        return await db.query.Payments.findMany({
            limit: limit
        });
    }
    return await db.query.Payments.findMany();
};

// Get a specific payment by ID
export const getPaymentByIdService = async (id: number): Promise<TSPayments | undefined> => {
    return await db.query.Payments.findFirst({
        where: eq(Payments.payment_id, id), // Ensure correct column name
    });
};

// Update a payment by ID
export const updatePaymentService = async (id: number, payment: TIPayments) => {
    await db.update(Payments).set(payment).where(eq(Payments.payment_id, id)).execute();
    return 'Payment updated successfully';
};

// Create a new payment
export const createPaymentService = async (payment: TIPayments) => {
    await db.insert(Payments).values(payment).execute();
    return 'Payment created successfully';
};

// Delete a payment by ID
export const deletePaymentService = async (id: number) => {
    await db.delete(Payments).where(eq(Payments.payment_id, id)).execute();
    return 'Payment deleted successfully';
};
