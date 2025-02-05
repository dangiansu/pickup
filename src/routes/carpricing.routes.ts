import { Router } from 'express';
import carpricingController from '../controllers/carpricing.controller';

const pricingRoutes = Router();

pricingRoutes.post('/create', carpricingController.create);
pricingRoutes.get('/getall', carpricingController.getall);
pricingRoutes.get('/getbyid/:id', carpricingController.getbyid);

export default pricingRoutes;
