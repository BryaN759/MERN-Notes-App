import express from 'express';
import * as Controllers from '../controllers/user.controllers';
import authMiddleware from '../middlewares/auth.middleware';

const router = express.Router();

// /api/user

router.get('/me', authMiddleware, Controllers.getLoggedInUserController);
router.post('/register', Controllers.registerController);
router.post('/sign-in', Controllers.signInController);
router.post('/log-out', Controllers.logOutController);

export default router;
