import { Context } from "hono";
import {
    billingService,
    getBillingByIdService,
    updateBillingService,
    createBillingService,
    deleteBillingService
} from "./Billing.service";

export const getAllBillings = async (c: Context) => {
    try {
        const limit = Number(c.req.query('limit'));
        const data = await billingService(limit);
        if (data == null || data.length === 0) {
            return c.json({ message: 'Billings not found' }, 404);
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error.message }, 400);
    }
};

export const getBilling = async (c: Context) => {
    try {
        const id = parseInt(c.req.param('id'));
        if (isNaN(id)) return c.text("Invalid ID", 400);

        const billing = await getBillingByIdService(id);
        if (!billing) {
            return c.json({ message: 'Billing not found' }, 404);
        }
        return c.json(billing, 200);
    } catch (error: any) {
        return c.json({ error: error.message }, 400);
    }
};

export const updateBilling = async (c: Context) => {
    const id = parseInt(c.req.param('id'));
    if (isNaN(id)) return c.text("Invalid ID", 400);
    const billing = await c.req.json();
    try {
        const existingBilling = await getBillingByIdService(id);
        if (!existingBilling) {
            return c.json({ message: 'Billing not found' }, 404);
        }
        const res = await updateBillingService(id, billing);
        return c.json({ message: res }, 200);
    } catch (error: any) {
        return c.json({ error: error.message }, 400);
    }
};

export const createBilling = async (c: Context) => {
    try {
        const billing = await c.req.json();
        const data = await createBillingService(billing);
        return c.json({ message: data }, 200);
    } catch (error: any) {
        return c.json({ error: error.message }, 400);
    }
};

export const deleteBilling = async (c: Context) => {
    const id = parseInt(c.req.param('id'));
    if (isNaN(id)) return c.text("Invalid ID", 400);
    try {
        const existingBilling = await getBillingByIdService(id);
        if (!existingBilling) {
            return c.json({ message: 'Billing not found' }, 404);
        }
        const data = await deleteBillingService(id);
        return c.json({ message: data }, 200);
    } catch (error: any) {
        return c.json({ error: error.message }, 400);
    }
};
