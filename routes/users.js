import express from 'express';
const router = express.Router();
import {
	getUsers,
	createUser,
	loginUser,
	updateUser,
} from '../controllers/userController.js';

router.get('/', getUsers);
router.post('/sign-in', createUser);
router.post('/login', loginUser);
router.post('/profile/update/:id', updateUser);

export default router;
