import { Context } from "hono";
import {
    getAllSchedulesService,
    getScheduleByIdService,
    updateScheduleService,
    createScheduleService,
    deleteScheduleService
} from "./schedules.service";

export const getAllSchedules = async (c: Context) => {
    try {
        const limit = Number(c.req.query('limit'));
        const data = await getAllSchedulesService(limit);
        if (data == null || data.length === 0) {
            return c.json({ message: 'Schedules not found' }, 404);
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error.message }, 400);
    }
};

export const getSchedule = async (c: Context) => {
    try {
        const id = parseInt(c.req.param('id'));
        if (isNaN(id)) return c.text("Invalid ID", 400);

        const schedule = await getScheduleByIdService(id);
        if (!schedule) {
            return c.json({ message: 'Schedule not found' }, 404);
        }
        return c.json(schedule, 200);
    } catch (error: any) {
        return c.json({ error: error.message }, 400);
    }
};

export const updateSchedule = async (c: Context) => {
    const id = parseInt(c.req.param('id'));
    if (isNaN(id)) return c.text("Invalid ID", 400);
    const schedule = await c.req.json();
    try {
        const searchSchedule = await getScheduleByIdService(id);
        if (!searchSchedule) {
            return c.json({ message: 'Schedule not found' }, 404);
        }
        const res = await updateScheduleService(id, schedule);
        return c.json({ message: res }, 200);
    } catch (error: any) {
        return c.json({ error: error.message }, 400);
    }
};

export const createSchedule = async (c: Context) => {
    try {
        const schedule = await c.req.json();
        const data = await createScheduleService(schedule);
        return c.json({ message: data }, 200);
    } catch (error: any) {
        return c.json({ error: error.message }, 400);
    }
};

export const deleteSchedule = async (c: Context) => {
    const id = parseInt(c.req.param('id'));
    if (isNaN(id)) return c.text("Invalid ID", 400);
    try {
        const searchSchedule = await getScheduleByIdService(id);
        if (!searchSchedule) {
            return c.json({ message: 'Schedule not found' }, 404);
        }
        const data = await deleteScheduleService(id);
        return c.json({ message: data }, 200);
    } catch (error: any) {
        return c.json({ error: error.message }, 400);
    }
};
