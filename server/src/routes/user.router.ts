import express, { Router } from "express";
import { UserController } from "../controllers/user.controller";
import {
  authenticateToken,
  validateSignIn,
  validateSignUp,
  validateUpdateProfile,
} from "../middleware/auth.middleware";

const userRouter: Router = express.Router();

const userController = new UserController();

userRouter.post(
  "/signIn",
  validateSignIn,
  userController.signIn.bind(userController)
);
userRouter.post(
  "/signUp",
  validateSignUp,
  userController.signUp.bind(userController)
);
userRouter.get("/signOut", userController.signOut.bind(userController));
userRouter.get(
  "/profile",
  authenticateToken,
  userController.getProfile.bind(userController)
);
userRouter.get(
  "/usersNotFollowed",
  authenticateToken,
  userController.getUsersNotFollowedByUser.bind(userController)
);
userRouter.get('/id', authenticateToken, userController.getUserId.bind(userController))
userRouter.get('/search', authenticateToken, userController.searchByUsername.bind(userController))
userRouter.post('/update', authenticateToken, userController.updateProfile.bind(userController))

export default userRouter;
