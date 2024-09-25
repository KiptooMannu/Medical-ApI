// src/controllers/inventoryController.ts

import { Context } from "hono";
import {
    inventoryService,
    getInventoryByIdService,
    updateInventoryService,
    createInventoryService,
    deleteInventoryService
} from "./Inventory.service";

export const getAllInventory = async (c: Context) => {
    try {
        const limit = Number(c.req.query('limit'));
        const data = await inventoryService(limit);
        if (data == null || data.length === 0) {
            return c.json({ message: 'Inventory items not found' }, 404);
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error.message }, 400);
    }
};

export const getInventory = async (c: Context) => {
    try {
        const id = parseInt(c.req.param('id'));
        if (isNaN(id)) return c.text("Invalid ID", 400);

        const inventoryItem = await getInventoryByIdService(id);
        if (!inventoryItem) {
            return c.json({ message: 'Inventory item not found' }, 404);
        }
        return c.json(inventoryItem, 200);
    } catch (error: any) {
        return c.json({ error: error.message }, 400);
    }
};

export const updateInventory = async (c: Context) => {
    const id = parseInt(c.req.param('id'));
    if (isNaN(id)) return c.text("Invalid ID", 400);
    const inventory = await c.req.json();
    try {
        // Search inventory item
        const searchInventoryItem = await getInventoryByIdService(id);
        if (!searchInventoryItem) {
            return c.json({ message: 'Inventory item not found' }, 404);
        }
        // Update inventory item
        const res = await updateInventoryService(id, inventory);
        return c.json({ message: res }, 200);
    } catch (error: any) {
        return c.json({ error: error.message }, 400);
    }
};

export const createInventory = async (c: Context) => {
    try {
        const inventory = await c.req.json();
        const data = await createInventoryService(inventory);
        return c.json({ message: data }, 200);
    } catch (error: any) {
        return c.json({ error: error.message }, 400);
    }
};

export const deleteInventory = async (c: Context) => {
    const id = parseInt(c.req.param('id'));
    if (isNaN(id)) return c.text("Invalid ID", 400);
    try {
        // Search the inventory item
        const searchInventoryItem = await getInventoryByIdService(id);
        if (!searchInventoryItem) {
            return c.json({ message: 'Inventory item not found' }, 404);
        }

        // Delete the inventory item
        const data = await deleteInventoryService(id);
        return c.json({ message: data }, 200);
    } catch (error: any) {
        return c.json({ error: error.message }, 400);
    }
};
