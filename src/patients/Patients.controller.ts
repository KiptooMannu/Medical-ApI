import { Context } from "hono";
import {
    patientService,
    getPatientByIdService,
    updatePatientService,
    createPatientService,
    deletePatientService
} from "./Patients.service"; // Adjust import based on your file structure

export const getAllPatients = async (c: Context) => {
    try {
        const limit = Number(c.req.query('limit'));
        const data = await patientService(limit);
        if (data == null || data.length === 0) {
            return c.json({ message: 'Patients not found' }, 404);
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error.message }, 400);
    }
};

export const getPatient = async (c: Context) => {
    try {
        const id = parseInt(c.req.param('id'));
        if (isNaN(id)) return c.text("Invalid ID", 400);

        const patient = await getPatientByIdService(id);
        if (!patient) {
            return c.json({ message: 'Patient not found' }, 404);
        }
        return c.json(patient, 200);
    } catch (error: any) {
        return c.json({ error: error.message }, 400);
    }
};

export const updatePatient = async (c: Context) => {
    const id = parseInt(c.req.param('id'));
    if (isNaN(id)) return c.text("Invalid ID", 400);
    const patientData = await c.req.json();
    try {
        // Search patient
        const searchPatient = await getPatientByIdService(id);
        if (!searchPatient) {
            return c.json({ message: 'Patient not found' }, 404);
        }
        // Update patient
        const res = await updatePatientService(id, patientData);
        return c.json({ message: res }, 200);
    } catch (error: any) {
        return c.json({ error: error.message }, 400);
    }
};

export const createPatient = async (c: Context) => {
    try {
        const patientData = await c.req.json();
        const data = await createPatientService(patientData);
        return c.json({ message: data }, 201);
    } catch (error: any) {
        return c.json({ error: error.message }, 400);
    }
};

export const deletePatient = async (c: Context) => {
    const id = parseInt(c.req.param('id'));
    if (isNaN(id)) return c.text("Invalid ID", 400);
    try {
        // Search the patient
        const searchPatient = await getPatientByIdService(id);
        if (!searchPatient) {
            return c.json({ message: 'Patient not found' }, 404);
        }

        // Deleting the patient
        const data = await deletePatientService(id);
        return c.json({ message: data }, 200);
    } catch (error: any) {
        return c.json({ error: error.message }, 400);
    }
};
