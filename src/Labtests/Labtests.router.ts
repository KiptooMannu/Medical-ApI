import { Hono } from 'hono';
import {
    getAllLabTests,
    getLabTest,
    updateLabTest,
    createLabTest,
    deleteLabTest
} from './labTest.controller';

const labTestsRouter = new Hono();

// Route to get all lab tests
labTestsRouter.get('/', getAllLabTests);

// Route to get a specific lab test by ID
labTestsRouter.get('/:id', getLabTest);

// Route to create a new lab test
labTestsRouter.post('/', createLabTest);

// Route to update an existing lab test by ID
labTestsRouter.put('/:id', updateLabTest);

// Route to delete a lab test by ID
labTestsRouter.delete('/:id', deleteLabTest);

export default labTestsRouter;
