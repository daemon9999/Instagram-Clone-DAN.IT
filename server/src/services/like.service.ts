import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export class LikeService {
    async likePost(userId: string,postId: string) {
        await prisma.postLike.create({
            data: {
                userId,
                postId
            }
        })

        return {statusCode: 201}
    }

    async unlikePost(userId: string,postId: string) {
        await prisma.postLike.deleteMany({
            where: {
                userId,
                postId
            }
        })

        return {statusCode: 201}
    }
  
}
