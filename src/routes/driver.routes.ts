import { Router } from 'express';
import drivercontroller from '../controllers/driver.controller';

const driverRouter = Router();

driverRouter.post('/create', drivercontroller.create);
driverRouter.post('/asigncar', drivercontroller.asigncars);
driverRouter.post('/agencydriver', drivercontroller.agencydriver);
driverRouter.get('/getAllData', drivercontroller.getall);
driverRouter.get('/getdriver/:id', drivercontroller.getbyid);
driverRouter.delete('/deletedDriver/:id', drivercontroller.delete);
driverRouter.put('/updateDriver', drivercontroller.update);

export default driverRouter;
