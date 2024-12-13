import { Router } from "express";
import {
    createContact, updateContactStatus , getContacts , getAllContacts
} from "../controllers/contact.controllers";
import { verifyJWT } from "../middlewares/auth.middleware";

const router = Router();

router.post("/create", verifyJWT, createContact);
router.post("/update/:contactId", verifyJWT, updateContactStatus);
router.get("/", verifyJWT, getContacts);
router.get("/all", getAllContacts);



export default router;