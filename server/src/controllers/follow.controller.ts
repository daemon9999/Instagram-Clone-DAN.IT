import { Request, Response } from "express";
import { FollowService } from "../services/follow.service";
import { findId } from "../utils/findId";

export class FollowController {
  private followService: FollowService;

  constructor() {
    this.followService = new FollowService();
  }

  async followUser(req: Request, res: Response) {
    try {
      const _id = findId(req);
      const {followingId} = req.body;
    
      const { statusCode, data } = await this.followService.followUser(
        _id,
        followingId
      );
      return res.status(statusCode).json({ message: data.message });
    } catch(err) {
      res.status(500).json({ err });
    }
  } 

  async unfollowUser(req: Request, res: Response) {
    try {
      const _id = findId(req);
      const {followingId} = req.body;
    
      const { statusCode, data } = await this.followService.unfollowUser(
        _id,
        followingId
      );
      return res.status(statusCode).json({ message: data.message });
    } catch(err) {
      res.status(500).json({ err });
    }
  } 
}
