import express from "express";
import {
  adminLogin,
  adminLogout,
  login,
  logout,
  register,
} from "../controllers/auth.controller.js";
const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.post("/logout", logout);

router.post("/admin-login", adminLogin);

router.post("/admin-logout", adminLogout);

export default router;
