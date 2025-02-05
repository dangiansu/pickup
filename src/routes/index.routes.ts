import { Router } from 'express';
import authRoutes from './auth.routes';
import banklistRoutes from './banklist.routes';
import bankRoutes from './bank.routes';
import agencyRoutes from './agency.routes';
import driverRouter from './driver.routes';
import carsRouter from './cars.routes';
import commonRoutes from './common.routes';
import pricingRoutes from './carpricing.routes';
import tripRouter from './booking.routes';

const route = Router();

route.use('/auth', authRoutes);
route.use('/banklist', banklistRoutes);
route.use('/bank', bankRoutes);
route.use('/agency', agencyRoutes);
route.use('/driver', driverRouter);
route.use('/cars', carsRouter);
route.use('/common', commonRoutes);
route.use('/pricing', pricingRoutes);
route.use('/trip', tripRouter);

export default route;
