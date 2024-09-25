import { Hono } from 'hono';
import {
    getAllPatients,
    getPatient,
    updatePatient,
    createPatient,
    deletePatient
} from './Patients.controller'; // Adjust import based on your file structure

const patientsRouter = new Hono();

// Route to get all patients
patientsRouter.get('patientsRouter/', getAllPatients);

// Route to get a specific patient by ID
patientsRouter.get('patientsRouter/:id', getPatient);

// Route to create a new patient
patientsRouter.post('patientsRouter/', createPatient);

// Route to update an existing patient by ID
patientsRouter.put('patientsRouter/:id', updatePatient);

// Route to delete a patient by ID
patientsRouter.delete('patientsRouter/:id', deletePatient);

export default patientsRouter;
