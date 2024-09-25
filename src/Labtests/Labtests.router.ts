import { Hono } from 'hono';
import {
    getAllLabTests,
    getLabTest,
    updateLabTest,
    createLabTest,
    deleteLabTest
} from './Labtests.controller';

const labTestsRouter = new Hono();


labTestsRouter.get('labTestsRouter/', getAllLabTests);


labTestsRouter.get('labTestsRouter/:id', getLabTest);

labTestsRouter.post('labTestsRouter/', createLabTest);


labTestsRouter.put('labTestsRouter/:id', updateLabTest);


labTestsRouter.delete('labTestsRouter/:id', deleteLabTest);

export default labTestsRouter;
