import { Context } from "hono";
import {
    getAllAppointmentsService,
    getAppointmentByIdService,
    updateAppointmentService,
    createAppointmentService,
    deleteAppointmentService
} from "./Appointments.service";

export const getAllAppointments = async (c: Context) => {
    try {
        const limit = Number(c.req.query('limit'));
        const data = await getAllAppointmentsService(limit);
        if (data == null || data.length === 0) {
            return c.json({ message: 'Appointments not found' }, 404);
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error.message }, 400);
    }
};

export const getAppointment = async (c: Context) => {
    try {
        const id = parseInt(c.req.param('id'));
        if (isNaN(id)) return c.text("Invalid ID", 400);

        const appointment = await getAppointmentByIdService(id);
        if (!appointment) {
            return c.json({ message: 'Appointment not found' }, 404);
        }
        return c.json(appointment, 200);
    } catch (error: any) {
        return c.json({ error: error.message }, 400);
    }
};

export const updateAppointment = async (c: Context) => {
    const id = parseInt(c.req.param('id'));
    if (isNaN(id)) return c.text("Invalid ID", 400);
    const appointment = await c.req.json();
    try {
        const searchAppointment = await getAppointmentByIdService(id);
        if (!searchAppointment) {
            return c.json({ message: 'Appointment not found' }, 404);
        }
        const res = await updateAppointmentService(id, appointment);
        return c.json({ message: res }, 200);
    } catch (error: any) {
        return c.json({ error: error.message }, 400);
    }
};

export const createAppointment = async (c: Context) => {
    try {
        const appointment = await c.req.json();
        const data = await createAppointmentService(appointment);
        return c.json({ message: data }, 200);
    } catch (error: any) {
        return c.json({ error: error.message }, 400);
    }
};

export const deleteAppointment = async (c: Context) => {
    const id = parseInt(c.req.param('id'));
    if (isNaN(id)) return c.text("Invalid ID", 400);
    try {
        const searchAppointment = await getAppointmentByIdService(id);
        if (!searchAppointment) {
            return c.json({ message: 'Appointment not found' }, 404);
        }
        const data = await deleteAppointmentService(id);
        return c.json({ message: data }, 200);
    } catch (error: any) {
        return c.json({ error: error.message }, 400);
    }
};
