import { Hono } from 'hono';
import { register, login } from './Auth.controller'; // Adjust the path to your controller

const authRouter = new Hono();

// User registration route
authRouter.post('/register', register);

// User login route
authRouter.post('/login', login); 

// Optional error handling middleware (if needed)
authRouter.onError((error, c) => {
  console.error(error);
  return c.json({ error: 'An error occurred' }, 500);
});

export default authRouter;
