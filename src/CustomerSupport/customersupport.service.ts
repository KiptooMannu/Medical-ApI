// supportTickets.service.ts
import { eq } from "drizzle-orm";
import { db } from "../drizzle/db";
import { SupportTickets, TISupportTickets, TSSupportTickets } from "../drizzle/schema";

export const getSupportTicketsService = async (limit?: number): Promise<TSSupportTickets[] | null> => {
  if (limit) {
    return await db.query.SupportTickets.findMany({ limit });
  }
  return await db.query.SupportTickets.findMany();
};

export const getSupportTicketByIdService = async (id: number): Promise<TSSupportTickets | undefined> => {
  return await db.query.SupportTickets.findFirst({ where: eq(SupportTickets.ticket_id, id) });
};

export const createSupportTicketService = async (ticket: TISupportTickets) => {
  await db.insert(SupportTickets).values(ticket).execute();
  return 'Support ticket created successfully';
};

export const updateSupportTicketService = async (id: number, ticket: TISupportTickets) => {
  await db.update(SupportTickets).set(ticket).where(eq(SupportTickets.ticket_id, id)).execute();
  return 'Support ticket updated successfully';
};

export const deleteSupportTicketService = async (id: number) => {
  await db.delete(SupportTickets).where(eq(SupportTickets.ticket_id, id)).execute();
  return 'Support ticket deleted successfully';
};
