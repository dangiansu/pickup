import { Router } from 'express';
import authController from '../controllers/auth.controller';
import { AuthGuard, CheckRole } from '../helpers/token';
import { ROLES } from '../helpers/constant';

const authRoutes = Router();

authRoutes.post('/register', authController.register);
authRoutes.post('/checkOtp', authController.verifyOTP);
authRoutes.post('/resedOTP', authController.resendOTP);
authRoutes.post('/login', authController.login);
authRoutes.post('/agency', authController.agencydeatil);
authRoutes.get(
  '/getall',
  AuthGuard,
  CheckRole([ROLES.SUPER_ADMIN]),
  authController.fetchAllUsers
);
authRoutes.get('/getbyid/:id', AuthGuard, authController.fetchById);
authRoutes.put('/changePassword', AuthGuard, authController.changepassword);

export default authRoutes;
