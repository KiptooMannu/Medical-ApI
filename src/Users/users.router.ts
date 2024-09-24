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
usersRouter.get('/', getAllUsers);

// Route to get a specific user by ID
usersRouter.get('/:id', getUser);

// Route to create a new user
usersRouter.post('/', createUser);

// Route to update an existing user by ID
usersRouter.put('/:id', updateUser);

// Route to delete a user by ID
usersRouter.delete('/:id', deleteUser);

export default usersRouter;
