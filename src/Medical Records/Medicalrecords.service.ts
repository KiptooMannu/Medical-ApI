import { eq } from "drizzle-orm";
import { db } from "../drizzle/db"; 
import { TSMedicalRecords, TIMedicalRecords, MedicalRecords } from "../drizzle/schema";

export const medicalRecordService = async (limit?: number): Promise<TSMedicalRecords[] | null> => {
    if (limit) {
        return await db.query.MedicalRecords.findMany({
            limit: limit
        });
    }
    return await db.query.MedicalRecords.findMany();
};

export const getMedicalRecordService = async (id: number): Promise<TSMedicalRecords | undefined> => {
    return await db.query.MedicalRecords.findFirst({
        where: eq(MedicalRecords.record_id, id),
    });
};

export const updateMedicalRecordService = async (id: number, medicalRecord: TIMedicalRecords) => {
    await db.update(MedicalRecords).set(medicalRecord).where(eq(MedicalRecords.record_id, id)).execute();
    return 'Medical Record updated successfully';
};

export const createMedicalRecordService = async (medicalRecord: TIMedicalRecords) => {
    await db.insert(MedicalRecords).values(medicalRecord).execute();
    return 'Medical Record created successfully';
};

export const deleteMedicalRecordService = async (id: number) => {
    await db.delete(MedicalRecords).where(eq(MedicalRecords.record_id, id)).execute();
    return 'Medical Record deleted successfully';
};
