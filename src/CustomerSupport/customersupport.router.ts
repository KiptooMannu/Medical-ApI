// supportTickets.router.ts
import { Hono } from 'hono';
import {
  getAllSupportTickets,
  getSupportTicket,
  createSupportTicket,
  updateSupportTicket,
  deleteSupportTicket
} from './customersupport.controller';

const supportTicketsRouter = new Hono();

supportTicketsRouter.get('messagesRouter/', getAllSupportTickets);
supportTicketsRouter.get('messagesRouter/:id', getSupportTicket);
supportTicketsRouter.post('messagesRouter/', createSupportTicket);
supportTicketsRouter.put('messagesRouter/:id', updateSupportTicket);
supportTicketsRouter.delete('messagesRouter/:id', deleteSupportTicket);

export default supportTicketsRouter;
