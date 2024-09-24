import { eq } from "drizzle-orm";
import { db } from "../drizzle/db"; 
import { TSAppointments, TIAppointments, Appointments } from "../drizzle/schema";

// Fetch all appointments with an optional limit
export const getAllAppointmentsService = async (limit?: number): Promise<TSAppointments[] | null> => {
    if (limit) {
        return await db.query.Appointments.findMany({
            limit: limit
        });
    }
    return await db.query.Appointments.findMany();
};

// Get a specific appointment by ID
export const getAppointmentByIdService = async (id: number): Promise<TSAppointments | undefined> => {
    return await db.query.Appointments.findFirst({
        where: eq(Appointments.appointment_id, id), // Ensure correct column name
    });
};

// Update an appointment by ID
export const updateAppointmentService = async (id: number, appointment: TIAppointments) => {
    await db.update(Appointments).set(appointment).where(eq(Appointments.appointment_id, id)).execute();
    return 'Appointment updated successfully';
};

// Create a new appointment
export const createAppointmentService = async (appointment: TIAppointments) => {
    await db.insert(Appointments).values(appointment).execute();
    return 'Appointment created successfully';
};

// Delete an appointment by ID
export const deleteAppointmentService = async (id: number) => {
    await db.delete(Appointments).where(eq(Appointments.appointment_id, id)).execute();
    return 'Appointment deleted successfully';
};
