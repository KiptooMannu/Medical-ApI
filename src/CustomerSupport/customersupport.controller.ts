// supportTicketsController.ts
import { Context } from "hono";
import {
  getSupportTicketsService,
  getSupportTicketByIdService,
  createSupportTicketService,
  updateSupportTicketService,
  deleteSupportTicketService
} from "./customersupport.service";

export const getAllSupportTickets = async (c: Context) => {
  try {
    const limit = Number(c.req.query('limit'));
    const tickets = await getSupportTicketsService(limit);
    if (tickets == null || tickets.length === 0) {
      return c.json({ message: 'Support tickets not found' }, 404);
    }
    return c.json(tickets, 200);
  } catch (error: any) {
    return c.json({ error: error.message }, 400);
  }
};

export const getSupportTicket = async (c: Context) => {
  try {
    const id = parseInt(c.req.param('id'));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const ticket = await getSupportTicketByIdService(id);
    if (!ticket) {
      return c.json({ message: 'Support ticket not found' }, 404);
    }
    return c.json(ticket, 200);
  } catch (error: any) {
    return c.json({ error: error.message }, 400);
  }
};

export const createSupportTicket = async (c: Context) => {
  try {
    const ticket = await c.req.json();
    const data = await createSupportTicketService(ticket);
    return c.json({ message: data }, 200);
  } catch (error: any) {
    return c.json({ error: error.message }, 400);
  }
};

export const updateSupportTicket = async (c: Context) => {
  const id = parseInt(c.req.param('id'));
  if (isNaN(id)) return c.text("Invalid ID", 400);
  const ticket = await c.req.json();
  try {
    const existingTicket = await getSupportTicketByIdService(id);
    if (!existingTicket) {
      return c.json({ message: 'Support ticket not found' }, 404);
    }
    const res = await updateSupportTicketService(id, ticket);
    return c.json({ message: res }, 200);
  } catch (error: any) {
    return c.json({ error: error.message }, 400);
  }
};

export const deleteSupportTicket = async (c: Context) => {
  const id = parseInt(c.req.param('id'));
  if (isNaN(id)) return c.text("Invalid ID", 400);
  try {
    const existingTicket = await getSupportTicketByIdService(id);
    if (!existingTicket) {
      return c.json({ message: 'Support ticket not found' }, 404);
    }
    const data = await deleteSupportTicketService(id);
    return c.json({ message: data }, 200);
  } catch (error: any) {
    return c.json({ error: error.message }, 400);
  }
};
