import express from "express";
import {
  loginController,
  logoutController,
  signupController,
} from "../controller/user.controller.js";
const userRouter = express.Router();

userRouter.post("/signup", signupController);
userRouter.post("/login", loginController);
userRouter.post("/logout", logoutController);

export default userRouter;
