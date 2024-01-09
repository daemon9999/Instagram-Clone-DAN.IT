import { Request, Response } from "express";
import { CommentService } from "../services/comment.service";
import { findId } from "../utils/findId";

export class CommentController {
  private commentService: CommentService;

  constructor() {
    this.commentService = new CommentService();
  }

  async addComment(req: Request, res: Response) {
    try {
      const _id = findId(req);
      const { postId, content } = req.body;
      const { statusCode, data } = await this.commentService.addComment(
        _id,
        postId,
        content
      );

      return res.status(statusCode).json({ message: data.message });
    } catch {
      return res.status(500).json({ message: "Internal Server Error!" });
    }
  }

  async getPostComments(req: Request, res: Response) {
    try {
      
      const {postId} = req.query
      
      const { statusCode, data } = await this.commentService.getPostComments(
        postId as string
      );
      
      return res.status(statusCode).json(data.comments);
    } catch {
      
      return res.status(500).json({ message: "Internal Server Error!" });
    }
  }
}
