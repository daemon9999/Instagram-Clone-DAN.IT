import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient()
export class CommentService{


    async addComment(userId: string, postId: string, content: string) {
        await prisma.comment.create({
            data: {
                content,
                 postId,
                 userId
            }
        })


        return {statusCode: 201, data: {message: "Comment added successfully!"}}
    }


    async getPostComments(postId: string) {
        const comments = await prisma.comment.findMany({
            where: {
                postId
            },
             select: {
                id: true,
                user: {
                    select: {
                        username: true,
                        id: true
                    }
                },
                content: true,
                createdAt: true,
             }
        })

        return {statusCode: 200, data: {comments}}



    }
}