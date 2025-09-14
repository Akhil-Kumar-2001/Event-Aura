import { Router } from 'express';
import AuthService from '../../service/auth/implementation/AuthService';
import AuthController from '../../controller/auth/implementation/AuthController';
import IAuthController from '../../controller/auth/interface/IAuthController';
import AuthRepository from '../../repository/auth/implementation/AuthRepository';


const router = Router();

const authRepository = new AuthRepository();
const authService = new AuthService(authRepository);
const authController:IAuthController = new AuthController(authService);

router.post('/signup',authController.signup.bind(authController))
router.post('/signin',authController.signin.bind(authController))
router.post('/logout',authController.logout.bind(authController))


export default router