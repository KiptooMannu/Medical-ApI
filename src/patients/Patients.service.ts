import { eq } from "drizzle-orm";
import { db } from "../drizzle/db"; 
import { TSPatients, TIPatients, Patients } from "../drizzle/schema";

// Fetch all patients with an optional limit
export const patientService = async (limit?: number): Promise<TSPatients[] | null> => {
    if (limit) {
        return await db.query.Patients.findMany({
            limit: limit
        });
    }
    return await db.query.Patients.findMany();
};

// Get a specific patient by ID
export const getPatientByIdService = async (id: number): Promise<TSPatients | undefined> => {
    return await db.query.Patients.findFirst({
        where: eq(Patients.patient_id, id), // Ensure correct column name
    });
};

// Update a patient by ID
export const updatePatientService = async (id: number, patient: TIPatients) => {
    await db.update(Patients).set(patient).where(eq(Patients.patient_id, id)).execute(); // Ensure correct column name
    return 'Patient updated successfully';
};

// Create a new patient
export const createPatientService = async (patient: TIPatients) => {
    await db.insert(Patients).values(patient).execute();
    return 'Patient created successfully';
};

// Delete a patient by ID
export const deletePatientService = async (id: number) => {
    await db.delete(Patients).where(eq(Patients.patient_id, id)).execute(); // Ensure correct column name
    return 'Patient deleted successfully';
};
