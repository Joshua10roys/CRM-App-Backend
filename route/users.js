import express from 'express';
import { registerUser, loginUser, forgotPassword, passwordReset } from '../controller/users_controllers.js';

const router = express.Router();

router.post('/create_user', registerUser)

router.post('/login', loginUser)

router.post('/forgot_password', forgotPassword)

router.post('/password_reset', passwordReset)

export const usersRouter = router;