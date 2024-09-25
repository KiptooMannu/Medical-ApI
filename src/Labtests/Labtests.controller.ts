import { Context } from "hono";
import {
    labTestService,
    getLabTestByIdService,
    updateLabTestService,
    createLabTestService,
    deleteLabTestService
} from "./Labtests.service";

export const getAllLabTests = async (c: Context) => {
    try {
        const limit = Number(c.req.query('limit'));
        const data = await labTestService(limit);
        if (data == null || data.length === 0) {
            return c.json({ message: 'Lab Tests not found' }, 404);
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error.message }, 400);
    }
};

export const getLabTest = async (c: Context) => {
    try {
        const id = parseInt(c.req.param('id'));
        if (isNaN(id)) return c.text("Invalid ID", 400);

        const labTest = await getLabTestByIdService(id);
        if (!labTest) {
            return c.json({ message: 'Lab Test not found' }, 404);
        }
        return c.json(labTest, 200);
    } catch (error: any) {
        return c.json({ error: error.message }, 400);
    }
};

export const updateLabTest = async (c: Context) => {
    const id = parseInt(c.req.param('id'));
    if (isNaN(id)) return c.text("Invalid ID", 400);
    const labTest = await c.req.json();
    try {
        // Search lab test
        const searchLabTest = await getLabTestByIdService(id);
        if (!searchLabTest) {
            return c.json({ message: 'Lab Test not found' }, 404);
        }
        // Update lab test
        const res = await updateLabTestService(id, labTest);
        return c.json({ message: res }, 200);
    } catch (error: any) {
        return c.json({ error: error.message }, 400);
    }
};

export const createLabTest = async (c: Context) => {
    try {
        const labTest = await c.req.json();
        const data = await createLabTestService(labTest);
        return c.json({ message: data }, 200);
    } catch (error: any) {
        return c.json({ error: error.message }, 400);
    }
};

export const deleteLabTest = async (c: Context) => {
    const id = parseInt(c.req.param('id'));
    if (isNaN(id)) return c.text("Invalid ID", 400);
    try {
        // Search the lab test
        const searchLabTest = await getLabTestByIdService(id);
        if (!searchLabTest) {
            return c.json({ message: 'Lab Test not found' }, 404);
        }

        // Deleting the lab test
        const data = await deleteLabTestService(id);
        return c.json({ message: data }, 200);
    } catch (error: any) {
        return c.json({ error: error.message }, 400);
    }
};
