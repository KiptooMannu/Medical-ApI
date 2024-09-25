import { eq } from "drizzle-orm";
import { db } from "../drizzle/db"; 

    import{ Departments ,TSDepartments, TIDepartments } from "../drizzle/schema";

// Fetch all departments with an optional limit
export const departmentService = async (limit?: number): Promise<TSDepartments[] | null> => {
    if (limit) {
        return await db.query.Departments.findMany({
            limit: limit
        });
    }
    return await db.query.Departments.findMany();
};

// Get a specific department by ID
export const getDepartmentByIdService = async (id: number): Promise<TSDepartments | undefined> => {
    return await db.query.Departments.findFirst({
        where: eq(Departments.department_id, id), // Ensure correct column name
    });
};

// Update a department by ID
export const updateDepartmentService = async (id: number, department: TIDepartments) => {
    await db.update(Departments).set(department).where(eq(Departments.department_id, id)).execute(); // Ensure correct column name
    return 'Department updated successfully';
};

// Create a new department
export const createDepartmentService = async (department: TIDepartments) => {
    await db.insert(Departments).values(department).execute();
    return 'Department created successfully';
};

// Delete a department by ID
export const deleteDepartmentService = async (id: number) => {
    await db.delete(Departments).where(eq(Departments.department_id, id)).execute(); // Ensure correct column name
    return 'Department deleted successfully';
};
