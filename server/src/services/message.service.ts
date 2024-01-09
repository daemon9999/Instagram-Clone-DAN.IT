import { PrismaClient } from "@prisma/client";
import { ObjectId } from "mongodb";



const prisma = new PrismaClient()
export class MessageService {

    /* SEND MESSAGE */
    async createMessage(content: string, senderId: string, receiverId: string) {
        return await prisma.message.create({
            data: {
                content, senderId, receiverId
            }
        })
    }

    /* GET MESSAGES */
    async getMessages() {

    }

}