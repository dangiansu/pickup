import { Router } from 'express';
import commonController from '../controllers/admin.controller';
const commonRoutes = Router();

commonRoutes.put('/updateStatus', commonController.updateStatus);
commonRoutes.post('/create', commonController.createzipcode);
commonRoutes.get('/getall', commonController.findallzipcode);
commonRoutes.get('/getbyid/:id', commonController.findbyid);
commonRoutes.put('/updated', commonController.updatezipcode);
commonRoutes.delete('/delete/:id', commonController.deletezipcode);

export default commonRoutes;
