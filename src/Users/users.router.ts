import { Hono } from 'hono';
import {
    getAllUsers,
    getUser,
    updateUser,
    createUser,
    deleteUser
} from './users.controller';

const usersRouter = new Hono();

// Route to get all users
usersRouter.get('usersRouter/', getAllUsers);

// Route to get a specific user by ID
usersRouter.get('usersRouter/:id', getUser);

// Route to create a new user
usersRouter.post('usersRouter/', createUser);

// Route to update an existing user by ID
usersRouter.put('usersRouter/:id', updateUser);

// Route to delete a user by ID
usersRouter.delete('usersRouter/:id', deleteUser);

export default usersRouter;
