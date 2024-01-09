
import { PostService } from "../services/post.service";
import { findId } from "../utils/findId";
import { Request, Response } from "express";

export class PostController {
  private postService: PostService;

  constructor() {
    this.postService = new PostService();
  }

  async createPost(req: Request, res: Response) {
    try {
      const _id = findId(req);
      const { caption, imageUrl, location } = req.body;
      const { statusCode, data } = await this.postService.createPost(
        _id,
        caption,
        imageUrl,
        location
      );
      return res.status(statusCode).json({ message: data?.message });
    } catch {
      res.status(500).json({ message: "Internal Server Error!" });
    }
  }

  async deletePost(req: Request, res: Response) {
    try {
      const _id = findId(req);
      const {postId} = req.body
      const { statusCode, data} = await this.postService.deletePost(
        _id,
        postId
      );
      return res.status(statusCode).json({ message: data?.message });
    } catch (err){
      res.status(500).json(err);
    }
  }

  async getFollowedUserPosts(req: Request, res: Response){
    try {
      const _id = findId(req)
    const {statusCode, data} = await this.postService.getFollowedUserPosts(_id)
    return res.status(statusCode).json(data.posts)
    } catch (err) {
      res.status(500).json({message: err})
    }
    
  }

  async getPostById(req: Request, res:Response) {

    try {
      const {id} = req.query
   
      const {statusCode, data} = await this.postService.getPostById(id as string)
   
      return res.status(statusCode).json(data.post)

    } catch  {
      res.status(500).json({message: "Internal Server Error!"})
      
    }
  }
}
