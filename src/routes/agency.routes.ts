import { Router } from 'express';
import agencyController from '../controllers/agency.controller';

const agencyRoutes = Router();

agencyRoutes.post('/create', agencyController.create);
agencyRoutes.get('/getall', agencyController.getall);
agencyRoutes.get('/:id', agencyController.getall);
agencyRoutes.post('/agency', agencyController.agencydeatil);
agencyRoutes.put('/docuemts', agencyController.uploaddocument);

export default agencyRoutes;
