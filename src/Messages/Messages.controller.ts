// messages.controller.ts
import { Context } from "hono";
import {
  getAllMessagesService,
  getMessageByIdService,
  createMessageService,
  updateMessageService,
  deleteMessageService
} from "./Messages.service";

export const getAllMessages = async (c: Context) => {
  try {
    const limit = Number(c.req.query('limit'));
    const messages = await getAllMessagesService(limit);
    if (messages == null || messages.length === 0) {
      return c.json({ message: 'Messages not found' }, 404);
    }
    return c.json(messages, 200);
  } catch (error: any) {
    return c.json({ error: error.message }, 400);
  }
};

export const getMessage = async (c: Context) => {
  try {
    const id = parseInt(c.req.param('id'));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const message = await getMessageByIdService(id);
    if (!message) {
      return c.json({ message: 'Message not found' }, 404);
    }
    return c.json(message, 200);
  } catch (error: any) {
    return c.json({ error: error.message }, 400);
  }
};

export const createMessage = async (c: Context) => {
  try {
    const message = await c.req.json();
    const data = await createMessageService(message);
    return c.json({ message: data }, 200);
  } catch (error: any) {
    return c.json({ error: error.message }, 400);
  }
};

export const updateMessage = async (c: Context) => {
  const id = parseInt(c.req.param('id'));
  if (isNaN(id)) return c.text("Invalid ID", 400);
  const message = await c.req.json();
  try {
    const existingMessage = await getMessageByIdService(id);
    if (!existingMessage) {
      return c.json({ message: 'Message not found' }, 404);
    }
    const res = await updateMessageService(id, message);
    return c.json({ message: res }, 200);
  } catch (error: any) {
    return c.json({ error: error.message }, 400);
  }
};

export const deleteMessage = async (c: Context) => {
  const id = parseInt(c.req.param('id'));
  if (isNaN(id)) return c.text("Invalid ID", 400);
  try {
    const existingMessage = await getMessageByIdService(id);
    if (!existingMessage) {
      return c.json({ message: 'Message not found' }, 404);
    }
    const data = await deleteMessageService(id);
    return c.json({ message: data }, 200);
  } catch (error: any) {
    return c.json({ error: error.message }, 400);
  }
};
