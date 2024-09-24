import { eq } from "drizzle-orm";
import { db } from "../drizzle/db"; 
import { TSLabTests, TILabTests, LabTests } from "../drizzle/schema";

// Fetch all lab tests with an optional limit
export const labTestService = async (limit?: number): Promise<TSLabTests[] | null> => {
    if (limit) {
        return await db.query.LabTests.findMany({
            limit: limit
        });
    }
    return await db.query.LabTests.findMany();
};

// Get a specific lab test by ID
export const getLabTestByIdService = async (id: number): Promise<TSLabTests | undefined> => {
    return await db.query.LabTests.findFirst({
        where: eq(LabTests.lab_test_id, id), // Ensure correct column name
    });
};

// Update a lab test by ID
export const updateLabTestService = async (id: number, labTest: TILabTests) => {
    await db.update(LabTests).set(labTest).where(eq(LabTests.lab_test_id, id)).execute(); // Ensure correct column name
    return 'Lab Test updated successfully';
};

// Create a new lab test
export const createLabTestService = async (labTest: TILabTests) => {
    await db.insert(LabTests).values(labTest).execute();
    return 'Lab Test created successfully';
};

// Delete a lab test by ID
export const deleteLabTestService = async (id: number) => {
    await db.delete(LabTests).where(eq(LabTests.lab_test_id, id)).execute(); // Ensure correct column name
    return 'Lab Test deleted successfully';
};
