import { Router } from 'express';
import tripController from '../controllers/booking.controller';

const tripRoutes = Router();

tripRoutes.post('/calculatePrice', tripController.calculateallcarPrice);
tripRoutes.post('/create', tripController.create);
tripRoutes.get('/getalldata', tripController.getallride);

export default tripRoutes;
