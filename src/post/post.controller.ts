import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post as PostEntity } from './entities/post.entity';
import { Response } from 'express';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get('search')
  async findPosts(
    @Query('searchKeyWord') searchKeyWord: string,
    @Query('sortOrder') sortOrder: string,
    @Query('page') page: number,
    @Query('sortColumn') sortColumn: string,
    @Query('limit') limit: number,
    @Res() res: Response,
  ) {
    try {
      const posts = await this.postService.findPosts(
        searchKeyWord,
        sortOrder,
        page,
        sortColumn as keyof PostEntity,
        limit,
      );
      return res.status(HttpStatus.OK).json(posts);
    } catch (error) {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'An error occurred' });
    }
  }

  @Post()
  async create(@Body() createPostDto: CreatePostDto, @Res() res: Response) {
    try {
      const post = await this.postService.create(createPostDto);
      return res.status(HttpStatus.CREATED).json(post);
    } catch (error) {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'An error occurred when create new post.' });
    }
  }

  @Get()
  async findAll(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Res() res: Response,
  ) {
    try {
      const posts = await this.postService.findAll(page, limit);
      return res.status(HttpStatus.OK).json(posts);
    } catch (error) {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'An error occurred' });
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    try {
      const post = await this.postService.findOne(+id);
      return res.status(HttpStatus.OK).json(post);
    } catch (error) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ message: 'Post not found' });
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
    @Res() res: Response,
  ) {
    try {
      const updatedPost = await this.postService.update(+id, updatePostDto);
      return res.status(HttpStatus.OK).json(updatedPost);
    } catch (error) {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'An error occurred when update post.' });
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    try {
      await this.postService.remove(+id);
      return res.status(HttpStatus.OK).json({ message: 'Post deleted' });
    } catch (error) {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'An error occurred when delete post.' });
    }
  }
}
