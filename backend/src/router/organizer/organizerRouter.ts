import { Router } from 'express';
import upload from "../../config/multerConfig"; 
import OrganizerController from '../../controller/organizer/implementation/OrganizerController';
import OrganizerRepository from '../../repository/organizer/implementation/OrganizerRepository';
import OrganizerService from '../../service/organizer/implementation/OrganizerService';
import IOrganizerController from '../../controller/organizer/interface/IOrganizerController';
import { validateToken } from '../../middleware/validateToken';




const router = Router();

const organizerRepository = new OrganizerRepository();
const organizerService = new OrganizerService(organizerRepository);
const organizerController:IOrganizerController = new OrganizerController(organizerService);


router.post("/create-event",validateToken("organizer"), upload.single("coverImage"), organizerController.createEvent.bind(organizerController));

router.put("/update-event/:id", validateToken("organizer"),upload.none(),organizerController.editEvent.bind(organizerController))

router.get("/events",validateToken("organizer"),organizerController.getEvents.bind(organizerController));



router.delete("/delete-event/:id", validateToken("organizer"), organizerController.deleteEvent.bind(organizerController));
router.get("/get-attendees/:id", validateToken("organizer"), organizerController.getAttendees.bind(organizerController));



export default router