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
schedulesRouter.get('/', getAllSchedules);

// Route to get a specific schedule by ID
schedulesRouter.get('/:id', getSchedule);

// Route to create a new schedule
schedulesRouter.post('/', createSchedule);

// Route to update an existing schedule by ID
schedulesRouter.put('/:id', updateSchedule);

// Route to delete a schedule by ID
schedulesRouter.delete('/:id', deleteSchedule);

export default schedulesRouter;
