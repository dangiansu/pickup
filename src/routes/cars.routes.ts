import { Router } from 'express';
import CarsController from '../controllers/cars.controller';

const carsRoutes = Router();

carsRoutes.post('/create', CarsController.create);
carsRoutes.get('/getalldata', CarsController.findAll);
carsRoutes.get('/getbyid/:id', CarsController.findById);
carsRoutes.post('/asgindriver', CarsController.asignDriver);
carsRoutes.delete('/deletecar/:id', CarsController.deleteCar);
carsRoutes.put('/updateCar', CarsController.update);

export default carsRoutes;
