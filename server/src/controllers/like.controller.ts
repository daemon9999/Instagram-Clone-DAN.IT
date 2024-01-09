import { Request, Response } from "express";
import { LikeService } from "../services/like.service";
import { findId } from "../utils/findId";

export class LikeController {
  private likeService: LikeService;

  constructor() {
    this.likeService = new LikeService();
  }

  async likePost(req: Request, res: Response) {
    try {
      const _id = findId(req);
      const {postId} = req.body;
    
      const { statusCode } = await this.likeService.likePost(
        _id,
        postId
      );
      return res.status(statusCode).json();
    } catch(err) {
      res.status(500).json({message: "Internal Server Error!"});
    }
  } 


  async unlikePost(req: Request, res: Response) {
    try {
      const _id = findId(req);
      const {postId} = req.body;
    
      const { statusCode } = await this.likeService.unlikePost(
        _id,
        postId
      );
      return res.status(statusCode).json();
    } catch(err) {
      res.status(500).json({message: "Internal Server Error!"});
    }
  } 


  
}
