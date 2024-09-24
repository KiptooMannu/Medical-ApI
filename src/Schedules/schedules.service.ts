import { eq } from "drizzle-orm";
import { db } from "../drizzle/db"; 
import { TSSchedules, TISchedules, Schedules } from "../drizzle/schema";

// Fetch all schedules with an optional limit
export const getAllSchedulesService = async (limit?: number): Promise<TSSchedules[] | null> => {
    if (limit) {
        return await db.query.Schedules.findMany({
            limit: limit
        });
    }
    return await db.query.Schedules.findMany();
};

// Get a specific schedule by ID
export const getScheduleByIdService = async (id: number): Promise<TSSchedules | undefined> => {
    return await db.query.Schedules.findFirst({
        where: eq(Schedules.schedule_id, id), // Ensure correct column name
    });
};

// Update a schedule by ID
export const updateScheduleService = async (id: number, schedule: TISchedules) => {
    await db.update(Schedules).set(schedule).where(eq(Schedules.schedule_id, id)).execute();
    return 'Schedule updated successfully';
};

// Create a new schedule
export const createScheduleService = async (schedule: TISchedules) => {
    await db.insert(Schedules).values(schedule).execute();
    return 'Schedule created successfully';
};

// Delete a schedule by ID
export const deleteScheduleService = async (id: number) => {
    await db.delete(Schedules).where(eq(Schedules.schedule_id, id)).execute();
    return 'Schedule deleted successfully';
};
