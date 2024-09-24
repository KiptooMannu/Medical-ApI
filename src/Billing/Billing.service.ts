import { eq } from "drizzle-orm";
import { db } from "../drizzle/db";
import { TSBilling, TIBilling, Billing } from "../drizzle/schema";

export const billingService = async (limit?: number): Promise<TSBilling[] | null> => {
    if (limit) {
        return await db.query.Billing.findMany({ limit: limit });
    }
    return await db.query.Billing.findMany();
};

export const getBillingByIdService = async (id: number): Promise<TSBilling | undefined> => {
    return await db.query.Billing.findFirst({ where: eq(Billing.bill_id, id) });
};

export const updateBillingService = async (id: number, billing: TIBilling) => {
    await db.update(Billing).set(billing).where(eq(Billing.bill_id, id)).execute();
    return 'Billing updated successfully';
};

export const createBillingService = async (billing: TIBilling) => {
    await db.insert(Billing).values(billing).execute();
    return 'Billing created successfully';
};

export const deleteBillingService = async (id: number) => {
    await db.delete(Billing).where(eq(Billing.bill_id, id)).execute();
    return 'Billing deleted successfully';
};
