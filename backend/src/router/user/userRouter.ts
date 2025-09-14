import { Router } from 'express';
import UserRepository from '../../repository/user/implementation/UserRepository';
import UserService from '../../service/user/implementation/UserService';
import IUserController from '../../controller/user/interface/IUserController';
import UserController from '../../controller/user/implementation/UserController';
import { validateToken } from '../../middleware/validateToken';



const router = Router();
const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController:IUserController = new UserController(userService);

router.get('/events',validateToken("attendee"),userController.getEvents.bind(userController));

router.post('/ticket-purchase',validateToken("attendee"),userController.purchaseTicket.bind(userController));


// Razorpay routes
router.post('/create-razorpay-order', validateToken("attendee"), userController.createRazorpayOrder.bind(userController));
router.post('/confirm-payment', validateToken("attendee"), userController.confirmPayment.bind(userController));

router.get('/tickets',validateToken("attendee"),userController.getTickets.bind(userController))
router.post('/cancel-ticket/:id',validateToken("attendee"),userController.cancelTicket.bind(userController))

export default router