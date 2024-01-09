import { Router } from "express";
import { CommentController } from "../controllers/comment.controller";
import { authenticateToken } from "../middleware/auth.middleware";



const commentRouter: Router = Router()

const commentController = new CommentController()

commentRouter.post('/comment', authenticateToken, commentController.addComment.bind(commentController))
commentRouter.get('/comments', authenticateToken, commentController.getPostComments.bind(commentController))
export default commentRouter