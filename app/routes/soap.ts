import {Router} from 'express';
import UserController from '../controllers/user';
import { callController } from '../utils/controllers';

const router = Router();

router.get('/User/GetPermanentSession', callController(UserController, 'getPermanentSession'));

export default router;