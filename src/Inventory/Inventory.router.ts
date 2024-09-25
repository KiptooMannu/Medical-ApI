// src/routes/inventoryRouter.ts

import { Hono } from 'hono';
import {
    getAllInventory,
    getInventory,
    updateInventory,
    createInventory,
    deleteInventory
} from './Inventory.controller';

const inventoryRouter = new Hono();

// Route to get all inventory items
inventoryRouter.get('inventoryRouter/', getAllInventory);

// Route to get a specific inventory item by ID
inventoryRouter.get('inventoryRouter/:id', getInventory);

// Route to create a new inventory item
inventoryRouter.post('inventoryRouter/', createInventory);

// Route to update an existing inventory item by ID
inventoryRouter.put('inventoryRouter/:id', updateInventory);

// Route to delete an inventory item by ID
inventoryRouter.delete('inventoryRouter/:id', deleteInventory);

export default inventoryRouter;
