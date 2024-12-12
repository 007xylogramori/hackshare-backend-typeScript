import { Router } from "express";
import { generateResponse } from "../controllers/genAi.controllers";
import { verifyJWT } from "../middlewares/auth.middleware";

const router = Router();

router.post("/gen-response", verifyJWT, generateResponse);

export default router;
