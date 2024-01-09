import { Router } from "express";
import { authenticateToken } from "../middleware/auth.middleware";
import { FavoriteController } from "../controllers/favorite.controller";

const favoriteRouter: Router = Router();

const favoriteController = new FavoriteController();

favoriteRouter.post(
  "/favorite",
  authenticateToken,
  favoriteController.favoritePost.bind(favoriteController)
);
favoriteRouter.post(
  "/unfavorite",
  authenticateToken,
  favoriteController.unfavoritePost.bind(favoriteController)
);

favoriteRouter.get(
    "/favorites",
    authenticateToken,
    favoriteController.getFavoritePosts.bind(favoriteController)
)

export default favoriteRouter;
