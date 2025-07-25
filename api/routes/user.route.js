
import express from 'express';
import { deleteUser, test} from '../controllers/user.controller.js'; // Importing the test controller
import {updateUser,uploadProfileImage} from "../controllers/auth.controller.js";
import { VerifyToken } from '../utils/VerifyToken.js';
const router = express.Router();

router.get('/test', test);  
router.post("/upload/:id", VerifyToken, uploadProfileImage)
router.post('/update/:id', VerifyToken,updateUser);  
router.delete('/delete/:id', VerifyToken,deleteUser);  



export default router;