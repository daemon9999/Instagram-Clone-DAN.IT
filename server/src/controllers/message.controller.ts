import { Server } from "socket.io";
import { MessageService } from "../services/message.service";



export class MessageController {
    private messageService: MessageService


    constructor() {
        this.messageService = new MessageService()
    }

    async sendMessage(content: string, receiverId: string, senderId: string, io: Server) {
        const savedMessage = await this.messageService.createMessage(content, senderId, receiverId)
        io.emit('send_message', savedMessage)
    }
}