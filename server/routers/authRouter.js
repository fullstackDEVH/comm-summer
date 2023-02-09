import express from "express"; 
import { login, register } from "../controllers/authController";

const router = express.Router();


// /api/auth/

// register
router.post('/register', register);

//login
router.post('/login', login);

export default router;