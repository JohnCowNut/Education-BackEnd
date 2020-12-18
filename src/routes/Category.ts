import { protectedAuth } from './../controllers/Auth';
import { createCategory } from "./../controllers/Category";
import express from "express";

const router = express.Router();
router.use(protectedAuth)
router.post("/", createCategory);

export default router;
