import express from 'express';
import * as Controllers from '../controllers/user.controllers';

const router = express.Router();

// /api/user

router.post('/register', Controllers.registerController);
router.post('/sign-in', Controllers.signInController);
router.post('/log-out', Controllers.logOutController);

export default router;
