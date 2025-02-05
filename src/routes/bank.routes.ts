import { Router } from 'express';
import bankService from '../controllers/bank.controller';

const bankRoutes = Router();

bankRoutes.post('/create', bankService.create);
bankRoutes.get('/get', bankService.getall);
bankRoutes.get('/:id', bankService.getbyid);
bankRoutes.put('/update', bankService.update);
bankRoutes.delete('/:id', bankService.delete);
bankRoutes.post('/createaccountinstripe', bankService.createAccountin);

export default bankRoutes;
