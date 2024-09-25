import { Context } from "hono";
import {
    departmentService,
    getDepartmentByIdService,
    updateDepartmentService,
    createDepartmentService,
    deleteDepartmentService
} from "./department.service";

export const getAllDepartments = async (c: Context) => {
    try {
        const limit = Number(c.req.query('limit'));
        const data = await departmentService(limit);
        if (data == null || data.length === 0) {
            return c.json({ message: 'Departments not found' }, 404);
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error.message }, 400);
    }
};

export const getDepartment = async (c: Context) => {
    try {
        const id = parseInt(c.req.param('id'));
        if (isNaN(id)) return c.text("Invalid ID", 400);

        const department = await getDepartmentByIdService(id);
        if (!department) {
            return c.json({ message: 'Department not found' }, 404);
        }
        return c.json(department, 200);
    } catch (error: any) {
        return c.json({ error: error.message }, 400);
    }
};

export const updateDepartment = async (c: Context) => {
    const id = parseInt(c.req.param('id'));
    if (isNaN(id)) return c.text("Invalid ID", 400);
    const department = await c.req.json();
    try {
        // Search department
        const searchDepartment = await getDepartmentByIdService(id);
        if (!searchDepartment) {
            return c.json({ message: 'Department not found' }, 404);
        }
        // Update department
        const res = await updateDepartmentService(id, department);
        return c.json({ message: res }, 200);
    } catch (error: any) {
        return c.json({ error: error.message }, 400);
    }
};

export const createDepartment = async (c: Context) => {
    try {
        const department = await c.req.json();
        const data = await createDepartmentService(department);
        return c.json({ message: data }, 201); // Respond with 201 Created
    } catch (error: any) {
        return c.json({ error: error.message }, 400);
    }
};

export const deleteDepartment = async (c: Context) => {
    const id = parseInt(c.req.param('id'));
    if (isNaN(id)) return c.text("Invalid ID", 400);
    try {
        // Search the department
        const searchDepartment = await getDepartmentByIdService(id);
        if (!searchDepartment) {
            return c.json({ message: 'Department not found' }, 404);
        }

        // Deleting the department
        const data = await deleteDepartmentService(id);
        return c.json({ message: data }, 200);
    } catch (error: any) {
        return c.json({ error: error.message }, 400);
    }
};
