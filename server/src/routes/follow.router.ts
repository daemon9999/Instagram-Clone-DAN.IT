import { Router } from "express";
import { FollowController } from "../controllers/follow.controller";
import { authenticateToken } from "../middleware/auth.middleware";


const followRouter: Router = Router()

const followController = new FollowController()

followRouter.post('/follow', authenticateToken, followController.followUser.bind(followController))
followRouter.post('/unfollow', authenticateToken, followController.unfollowUser.bind(followController))

export default followRouter