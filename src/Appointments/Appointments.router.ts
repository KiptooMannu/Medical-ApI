import { Hono } from 'hono';
import {
    getAllAppointments,
    getAppointment,
    updateAppointment,
    createAppointment,
    deleteAppointment
} from './Appointments.controller';

const appointmentsRouter = new Hono();

// Route to get all appointments
appointmentsRouter.get('/', getAllAppointments);

// Route to get a specific appointment by ID
appointmentsRouter.get('/:id', getAppointment);

// Route to create a new appointment
appointmentsRouter.post('/', createAppointment);

// Route to update an existing appointment by ID
appointmentsRouter.put('/:id', updateAppointment);

// Route to delete an appointment by ID
appointmentsRouter.delete('/:id', deleteAppointment);

export default appointmentsRouter;
