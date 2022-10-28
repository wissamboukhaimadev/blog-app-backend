import { Controller, Get, Param, ParseIntPipe, Post, Body, UsePipes, ValidationPipe, HttpException, HttpStatus } from '@nestjs/common';
import { CommentsDto } from 'src/dtos/Comments.dto';
import { CommentserviceService } from '../commentservice/commentservice.service';

import { Comments } from '@prisma/client'

@Controller('comments')
export class CommentcontrollerController {

    // comments Service Injection
    constructor(private readonly commentService: CommentserviceService) { }

    @Get('/:id')
    async getPostComments(@Param('id') slug: string) {
        const comment = await this.commentService.getPostComments(slug)
        if (comment.length > 0) {
            return comment
        } else {
            throw new HttpException('No One Comment To This Post', HttpStatus.NOT_FOUND)
        }
    }

    @UsePipes(ValidationPipe)
    @Post('create')
    async createComment(@Body() comments: CommentsDto): Promise<Comments> {
        if (!comments.authorId || !comments.body || comments.body.trim().length <= 0) {
            throw new HttpException('provide All Bodies', HttpStatus.FORBIDDEN)
        }
        return this.commentService.createComment(comments)
    }

}
