import { Context } from "hono";
import {
    getAllPaymentsService,
    getPaymentByIdService,
    updatePaymentService,
    createPaymentService,
    deletePaymentService
} from "./payments.service";

export const getAllPayments = async (c: Context) => {
    try {
        const limit = Number(c.req.query('limit'));
        const data = await getAllPaymentsService(limit);
        if (data == null || data.length === 0) {
            return c.json({ message: 'Payments not found' }, 404);
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error.message }, 400);
    }
};

export const getPayment = async (c: Context) => {
    try {
        const id = parseInt(c.req.param('id'));
        if (isNaN(id)) return c.text("Invalid ID", 400);

        const payment = await getPaymentByIdService(id);
        if (!payment) {
            return c.json({ message: 'Payment not found' }, 404);
        }
        return c.json(payment, 200);
    } catch (error: any) {
        return c.json({ error: error.message }, 400);
    }
};

export const updatePayment = async (c: Context) => {
    const id = parseInt(c.req.param('id'));
    if (isNaN(id)) return c.text("Invalid ID", 400);
    const payment = await c.req.json();
    try {
        const searchPayment = await getPaymentByIdService(id);
        if (!searchPayment) {
            return c.json({ message: 'Payment not found' }, 404);
        }
        const res = await updatePaymentService(id, payment);
        return c.json({ message: res }, 200);
    } catch (error: any) {
        return c.json({ error: error.message }, 400);
    }
};

export const createPayment = async (c: Context) => {
    try {
        const payment = await c.req.json();
        const data = await createPaymentService(payment);
        return c.json({ message: data }, 200);
    } catch (error: any) {
        return c.json({ error: error.message }, 400);
    }
};

export const deletePayment = async (c: Context) => {
    const id = parseInt(c.req.param('id'));
    if (isNaN(id)) return c.text("Invalid ID", 400);
    try {
        const searchPayment = await getPaymentByIdService(id);
        if (!searchPayment) {
            return c.json({ message: 'Payment not found' }, 404);
        }
        const data = await deletePaymentService(id);
        return c.json({ message: data }, 200);
    } catch (error: any) {
        return c.json({ error: error.message }, 400);
    }
};
