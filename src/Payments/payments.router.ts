import { Hono } from 'hono';
import {
    getAllPayments,
    getPayment,
    updatePayment,
    createPayment,
    deletePayment
} from './payments.controller';

const paymentsRouter = new Hono();

// Route to get all payments
paymentsRouter.get('paymentsRouter/', getAllPayments);

// Route to get a specific payment by ID
paymentsRouter.get('paymentsRouter/:id', getPayment);

// Route to create a new payment
paymentsRouter.post('/', createPayment);

// Route to update an existing payment by ID
paymentsRouter.put('paymentsRouter/:id', updatePayment);

// Route to delete a payment by ID
paymentsRouter.delete('paymentsRouter/:id', deletePayment);

export default paymentsRouter;
