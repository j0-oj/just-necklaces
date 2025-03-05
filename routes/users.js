import express from 'express';
const router = express.Router();
import {
	getUsers,
	createUser,
	loginUser,
	updateUsername,
} from '../controllers/userController.js';

router.get('/', getUsers);
router.post('/sign-in', createUser);
router.post('/login', loginUser);
router.post('/update-profile/:id', updateUsername);

export default router;
