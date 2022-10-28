import { Injectable } from '@nestjs/common';
import { CommentsDto } from 'src/dtos/Comments.dto';
import { PrismaLogicService } from 'src/prisma-logic/prisma-logic.service';

@Injectable()
export class CommentserviceService {

    constructor(private readonly prisma: PrismaLogicService) { }

    async getPostComments(slug: string) {
        const comments = await this.prisma.comments.findMany({
            where: {
                postTitle: slug

            },
            include: {
                author: true
            }
        })
        return comments
    }


    async createComment(data: CommentsDto) {
        const { body, authorId, postTitle } = data
        const newComment = await this.prisma.comments.create({
            data: {
                body,
                authorId,
                postTitle
            }
        })

        return newComment
    }
}
