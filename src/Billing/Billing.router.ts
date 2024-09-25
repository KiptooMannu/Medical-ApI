import { Hono } from 'hono';
import {
    getAllBillings,
    getBilling,
    updateBilling,
    createBilling,
    deleteBilling
} from './Billing.controller';

const billingRouter = new Hono();

billingRouter.get('billingRouter/', getAllBillings);
billingRouter.get('billingRouter/:id', getBilling);
billingRouter.post('billingRouter/', createBilling);
billingRouter.put('billingRouter/:id', updateBilling);
billingRouter.delete('billingRouter/:id', deleteBilling);

export default billingRouter;
