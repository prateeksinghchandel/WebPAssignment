import {Router} from "express";
import {regesterUser,loginUser} from "../controllers/user.controller.js";

const router= Router();
router.route("/register").post(regesterUser);
router.route("/login").post(loginUser);

export default router;