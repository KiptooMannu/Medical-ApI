// messages.router.ts
import { Hono } from 'hono';
import {
  getAllMessages,
  getMessage,
  createMessage,
  updateMessage,
  deleteMessage
} from './Messages.controller';

const messagesRouter = new Hono();

messagesRouter.get('messagesRouter/', getAllMessages);
messagesRouter.get('messagesRouter/:id', getMessage);
messagesRouter.post('messagesRouter/', createMessage);
messagesRouter.put('messagesRouter/:id', updateMessage);
messagesRouter.delete('messagesRouter/:id', deleteMessage);

export default messagesRouter;
