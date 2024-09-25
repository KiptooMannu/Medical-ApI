import { Hono } from 'hono';
import {
    getAllSchedules,
    getSchedule,
    updateSchedule,
    createSchedule,
    deleteSchedule
} from './schedules.controller';

const schedulesRouter = new Hono();

// Route to get all schedules
schedulesRouter.get('schedulesRouter/', getAllSchedules);

// Route to get a specific schedule by ID
schedulesRouter.get('schedulesRouter/:id', getSchedule);

// Route to create a new schedule
schedulesRouter.post('schedulesRouter/', createSchedule);

// Route to update an existing schedule by ID
schedulesRouter.put('schedulesRouter/:id', updateSchedule);

// Route to delete a schedule by ID
schedulesRouter.delete('schedulesRouter/:id', deleteSchedule);

export default schedulesRouter;
