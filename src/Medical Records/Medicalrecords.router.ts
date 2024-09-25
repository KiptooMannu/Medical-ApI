import { Hono } from 'hono';
import {
    getMedicalRecord,
    createMedicalRecord,
    updateMedicalRecord,
    deleteMedicalRecord,
    // SearchMedicalRecord
} from './Medicalrecords.controller';

const medicalRecordRouter = new Hono();

// Define routes for medical record resource
medicalRecordRouter.get('/medical-records', getMedicalRecord);
medicalRecordRouter.post('/medical-records', createMedicalRecord);
medicalRecordRouter.put('/medical-records/:id', updateMedicalRecord);
medicalRecordRouter.delete('/medical-records/:id', deleteMedicalRecord);
// medicalRecordRouter.get('/medical-records/search', SearchMedicalRecord);

export default medicalRecordRouter;
