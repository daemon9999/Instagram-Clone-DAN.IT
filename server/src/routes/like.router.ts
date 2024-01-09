import { Router } from "express";
import { authenticateToken } from "../middleware/auth.middleware";
import { LikeController } from "../controllers/like.controller";

const likeRouter: Router = Router();

const likeController = new LikeController();

likeRouter.post(
  "/like",
  authenticateToken,
  likeController.likePost.bind(likeController)
);
likeRouter.post(
  "/unlike",
  authenticateToken,
  likeController.unlikePost.bind(likeController)
);

export default likeRouter;
