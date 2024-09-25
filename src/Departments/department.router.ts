import { Hono } from 'hono';
import {
    getAllDepartments,
    getDepartment,
    updateDepartment,
    createDepartment,
    deleteDepartment
} from './department.controller';

const departmentsRouter = new Hono();

// Route to get all departments
departmentsRouter.get('departmentsRouter/', getAllDepartments);

// Route to get a specific department by ID
departmentsRouter.get('departmentsRouter/:id', getDepartment);

// Route to create a new department
departmentsRouter.post('departmentsRouter/', createDepartment);

// Route to update an existing department by ID
departmentsRouter.put('departmentsRouter/:id', updateDepartment);

// Route to delete a department by ID
departmentsRouter.delete('departmentsRouter/:id', deleteDepartment);

export default departmentsRouter;
