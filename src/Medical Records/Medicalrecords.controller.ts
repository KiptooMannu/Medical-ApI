import { Context } from "hono";
import {
    medicalRecordService,
    getMedicalRecordService,
    updateMedicalRecordService,
    createMedicalRecordService,
    deleteMedicalRecordService
} from "./Medicalrecords.service";

export const getAllMedicalRecords = async (c: Context) => {
    try {
        const limit = Number(c.req.query('limit'));
        const data = await medicalRecordService(limit);
        if (data == null || data.length === 0) {
            return c.json({ message: 'Medical Records not found' }, 404);
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error.message }, 400);
    }
};

export const getMedicalRecord = async (c: Context) => {
    try {
        const id = parseInt(c.req.param('id'));
        if (isNaN(id)) return c.text("Invalid ID", 400);

        const medicalRecord = await getMedicalRecordService(id);
        if (!medicalRecord) {
            return c.json({ message: 'Medical Record not found' }, 404);
        }
        return c.json(medicalRecord, 200);
    } catch (error: any) {
        return c.json({ error: error.message }, 400);
    }
};

export const updateMedicalRecord = async (c: Context) => {
    const id = parseInt(c.req.param('id'));
    if (isNaN(id)) return c.text("Invalid ID", 400);
    const medicalRecord = await c.req.json();
    try {
        // Search medical record
        const searchMedicalRecord = await getMedicalRecordService(id);
        if (!searchMedicalRecord) {
            return c.json({ message: 'Medical Record not found' }, 404);
        }
        // Update medical record
        const res = await updateMedicalRecordService(id, medicalRecord);
        return c.json({ message: res }, 200);
    } catch (error: any) {
        return c.json({ error: error.message }, 400);
    }
};

export const createMedicalRecord = async (c: Context) => {
    try {
        const medicalRecord = await c.req.json();
        const data = await createMedicalRecordService(medicalRecord);
        return c.json({ message: data }, 200);
    } catch (error: any) {
        return c.json({ error: error.message }, 400);
    }
};

export const deleteMedicalRecord = async (c: Context) => {
    const id = parseInt(c.req.param('id'));
    if (isNaN(id)) return c.text("Invalid ID", 400);
    try {
        // Search the medical record
        const searchMedicalRecord = await getMedicalRecordService(id);
        if (!searchMedicalRecord) {
            return c.json({ message: 'Medical Record not found' }, 404);
        }

        // Deleting the medical record
        const data = await deleteMedicalRecordService(id);
        return c.json({ message: data }, 200);
    } catch (error: any) {
        return c.json({ error: error.message }, 400);
    }
};
