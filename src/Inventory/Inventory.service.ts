// src/services/inventoryService.ts

import { eq } from "drizzle-orm";
import { db } from "../drizzle/db"; 
import { TSInventory, TIInventory, Inventory } from "../drizzle/schema";

// Fetch all inventory items with an optional limit
export const inventoryService = async (limit?: number): Promise<TSInventory[] | null> => {
    if (limit) {
        return await db.query.Inventory.findMany({
            limit: limit,
        });
    }
    return await db.query.Inventory.findMany();
};

// Get a specific inventory item by ID
export const getInventoryByIdService = async (id: number): Promise<TSInventory | undefined> => {
    return await db.query.Inventory.findFirst({
        where: eq(Inventory.item_id, id), // Ensure correct column name
    });
};

// Update an inventory item by ID
export const updateInventoryService = async (id: number, inventory: TIInventory) => {
    await db.update(Inventory).set(inventory).where(eq(Inventory.item_id, id)).execute(); // Ensure correct column name
    return 'Inventory item updated successfully';
};

// Create a new inventory item
export const createInventoryService = async (inventory: TIInventory) => {
    await db.insert(Inventory).values(inventory).execute();
    return 'Inventory item created successfully';
};

// Delete an inventory item by ID
export const deleteInventoryService = async (id: number) => {
    await db.delete(Inventory).where(eq(Inventory.item_id, id)).execute(); // Ensure correct column name
    return 'Inventory item deleted successfully';
};
