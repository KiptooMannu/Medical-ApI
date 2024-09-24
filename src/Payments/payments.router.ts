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
paymentsRouter.get('/', getAllPayments);

// Route to get a specific payment by ID
paymentsRouter.get('/:id', getPayment);

// Route to create a new payment
paymentsRouter.post('/', createPayment);

// Route to update an existing payment by ID
paymentsRouter.put('/:id', updatePayment);

// Route to delete a payment by ID
paymentsRouter.delete('/:id', deletePayment);

export default paymentsRouter;
