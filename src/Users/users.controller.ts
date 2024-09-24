import { Context } from "hono";
import {
    getAllUsersService,
    getUserByIdService,
    updateUserService,
    createUserService,
    deleteUserService
} from "./users.service";

export const getAllUsers = async (c: Context) => {
    try {
        const limit = Number(c.req.query('limit'));
        const data = await getAllUsersService(limit);
        if (data == null || data.length === 0) {
            return c.json({ message: 'Users not found' }, 404);
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error.message }, 400);
    }
};

export const getUser = async (c: Context) => {
    try {
        const id = parseInt(c.req.param('id'));
        if (isNaN(id)) return c.text("Invalid ID", 400);

        const user = await getUserByIdService(id);
        if (!user) {
            return c.json({ message: 'User not found' }, 404);
        }
        return c.json(user, 200);
    } catch (error: any) {
        return c.json({ error: error.message }, 400);
    }
};

export const updateUser = async (c: Context) => {
    const id = parseInt(c.req.param('id'));
    if (isNaN(id)) return c.text("Invalid ID", 400);
    const user = await c.req.json();
    try {
        const searchUser = await getUserByIdService(id);
        if (!searchUser) {
            return c.json({ message: 'User not found' }, 404);
        }
        const res = await updateUserService(id, user);
        return c.json({ message: res }, 200);
    } catch (error: any) {
        return c.json({ error: error.message }, 400);
    }
};

export const createUser = async (c: Context) => {
    try {
        const user = await c.req.json();
        const data = await createUserService(user);
        return c.json({ message: data }, 200);
    } catch (error: any) {
        return c.json({ error: error.message }, 400);
    }
};

export const deleteUser = async (c: Context) => {
    const id = parseInt(c.req.param('id'));
    if (isNaN(id)) return c.text("Invalid ID", 400);
    try {
        const searchUser = await getUserByIdService(id);
        if (!searchUser) {
            return c.json({ message: 'User not found' }, 404);
        }
        const data = await deleteUserService(id);
        return c.json({ message: data }, 200);
    } catch (error: any) {
        return c.json({ error: error.message }, 400);
    }
};
