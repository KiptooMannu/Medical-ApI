// messages.service.ts
import { eq } from "drizzle-orm";
import { db } from "../drizzle/db";
import { Messages, TIMessages, TSMessages } from "../drizzle/schema";

export const getAllMessagesService = async (limit?: number): Promise<TSMessages[] | null> => {
  if (limit) {
    return await db.query.Messages.findMany({ limit });
  }
  return await db.query.Messages.findMany();
};


export const getMessageByIdService = async (id: number): Promise<TSMessages | undefined> => {
  return await db.query.Messages.findFirst({ where: eq(Messages.message_id, id) });
};

export const createMessageService = async (message: TIMessages) => {
  await db.insert(Messages).values(message).execute();
  return 'Message created successfully';
};

export const updateMessageService = async (id: number, message: TIMessages) => {
  await db.update(Messages).set(message).where(eq(Messages.message_id, id)).execute();
  return 'Message updated successfully';
};

export const deleteMessageService = async (id: number) => {
  await db.delete(Messages).where(eq(Messages.message_id, id)).execute();
  return 'Message deleted successfully';
};
