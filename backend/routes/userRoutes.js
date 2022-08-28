import express from "express";
import {
  signup,
  signin,
  confirm,
  recoverPassword,
  checkToken,
  newPassword,
  profile,
} from "../controllers/userController.js";
import checkAuth from "../middleware/checkAuth.js";

// set router
const router = express.Router();

// autenticate, register and confirm users
router.post("/", signup);
router.post("/signin", signin);
router.get("/confirm/:token", confirm);
router.post("/forgot-password", recoverPassword);
router.route("/forgot-password/:token").get(checkToken).post(newPassword);

router.get("/profile", checkAuth, profile);

export default router;
