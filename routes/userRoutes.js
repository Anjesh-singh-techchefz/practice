import express from 'express';
import userCtrl from '../controllers/user';

const router = express.Router();

router.route('/create-user').post(userCtrl.createUser)

export default router;