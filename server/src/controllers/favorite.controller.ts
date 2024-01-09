import { Request, Response } from "express";

import { findId } from "../utils/findId";
import { FavoriteService } from "../services/favorite.service";

export class FavoriteController {
  private favoriteService: FavoriteService;

  constructor() {
    this.favoriteService = new FavoriteService();
  }

  async favoritePost(req: Request, res: Response) {
    try {
      const _id = findId(req);
      const { postId } = req.body;

      const { statusCode } = await this.favoriteService.favoritePost(
        _id,
        postId
      );
      return res.status(statusCode).json();
    } catch (err) {
      res.status(500).json({ message: "Internal Server Error!" });
    }
  }

  async unfavoritePost(req: Request, res: Response) {
    try {
      const _id = findId(req);
      const { postId } = req.body;

      const { statusCode } = await this.favoriteService.unfavoritePost(
        _id,
        postId
      );
      return res.status(statusCode).json();
    } catch (err) {
      res.status(500).json({ message: "Internal Server Error!" });
    }
  }

  async getFavoritePosts(req: Request, res: Response) {
    try {
      const _id = findId(req);

      const { statusCode, data } = await this.favoriteService.getFavoritePosts(_id);
      return res.status(statusCode).json(data.favoritePosts);
    } catch (err) {
      res.status(500).json({ message: "Internal Server Error!" });
    }
  }
}
