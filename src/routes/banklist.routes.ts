import { Router } from 'express';
import banklistController from '../controllers/banklist.controller';

const banklistRoutes = Router();

banklistRoutes.get('/get', banklistController.getall);
banklistRoutes.post('/create', banklistController.create);
banklistRoutes.get('/:id', banklistController.getbyId);
banklistRoutes.put('/update', banklistController.update);
banklistRoutes.delete('/:id', banklistController.delete);

export default banklistRoutes;
