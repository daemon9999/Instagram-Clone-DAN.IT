import { Router } from "express";
import { PostController } from "../controllers/post.controller";
import { authenticateToken } from "../middleware/auth.middleware";


const postRouter: Router = Router()
const postController = new PostController()

postRouter.post('/post', authenticateToken, postController.createPost.bind(postController))
postRouter.post('/deletePost', authenticateToken, postController.deletePost.bind(postController))
postRouter.get('/posts', authenticateToken, postController.getFollowedUserPosts.bind(postController))
postRouter.get('/post', authenticateToken, postController.getPostById.bind(postController))

export default postRouter