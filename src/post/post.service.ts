import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Post } from './entities/post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}

  private getPagination(page: number, limit: number) {
    const offset = (page - 1) * limit;
    return { offset, limit };
  }

  async findPosts(
    searchKeyWord: string,
    sortOrder: string,
    page: number,
    sortColumn: keyof Post,
    limit: number,
  ) {
    const validColumns = ['id', 'title', 'createdAt', 'updatedAt'];
    if (!validColumns.includes(sortColumn)) {
      sortColumn = 'id';
    }

    if (isNaN(limit)) {
      limit = 10;
    }
    if (isNaN(page)) {
      page = 1;
    }
    const { offset } = this.getPagination(page, limit);

    const [results, total] = await this.postRepository.findAndCount({
      select: ['id', 'title', 'createdAt', 'updatedAt'],
      where: { title: Like(`%${searchKeyWord}%`) },
      order: {
        [sortColumn]: sortOrder.toUpperCase() === 'DESC' ? 'DESC' : 'ASC',
      },
      skip: offset,
      take: limit,
    });

    const page_count = +results.length;
    const total_results = total;
    const records = results.map((post) => ({
      id: post.id,
      title: post.title,
      content: post.content,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      uri: `/post/${post.id}`,
    }));

    const _metadata = {
      page: +page,
      per_page: +limit,
      page_count,
      total_results,
      Links: [
        {
          current: `/post/search?searchKeyWord=${searchKeyWord}&sortOrder=${sortOrder}&page=${page}&sortColumn=${sortColumn}&limit=${limit}`,
        },
        {
          first: `/post/search?searchKeyWord=${searchKeyWord}&sortOrder=${sortOrder}&page=1&sortColumn=${sortColumn}&limit=${limit}`,
        },
        {
          previous: `/post/search?searchKeyWord=${searchKeyWord}&sortOrder=${sortOrder}&page=${page - 1}&sortColumn=${sortColumn}&limit=${limit}`,
        },
        {
          next: `/post/search?searchKeyWord=${searchKeyWord}&sortOrder=${sortOrder}&page=${page + 1}&sortColumn=${sortColumn}&limit=${limit}`,
        },
        {
          last: `/post/search?searchKeyWord=${searchKeyWord}&sortOrder=${sortOrder}&page=${Math.ceil(total / limit)}&sortColumn=${sortColumn}&limit=${limit}`,
        },
      ],
    };

    return {
      _metadata,
      records,
    };
  }

  async create(createPostDto: CreatePostDto) {
    return await this.postRepository.save(createPostDto);
  }

  async findAll(page: number = 1, limit: number) {
    if (isNaN(limit)) {
      limit = 10;
    }
    if (isNaN(page)) {
      page = 1;
    }
    const { offset } = this.getPagination(page, limit);

    const [results, total] = await this.postRepository.findAndCount({
      select: ['id', 'title', 'createdAt', 'updatedAt'],
      order: { createdAt: 'DESC' },
      skip: offset,
      take: limit,
    });

    const page_count = results.length;
    const total_count = total;
    const records = results.map((post) => ({
      id: post.id,
      title: post.title,
      content: post.content,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      uri: `/post/${post.id}`,
    }));

    const _metadata = {
      page,
      per_page: limit,
      page_count,
      total_count,
      Links: [
        { current: `/post?page=${page}&limit=${limit}` },
        { first: `/post?page=1&limit=${limit}` },
        { previous: `/post?page=${+page - 1}&limit=${limit}` },
        { next: `/post?page=${+page + 1}&limit=${limit}` },
        { last: `/post?page=${Math.ceil(total / limit)}&limit=${limit}` },
      ],
    };

    return {
      _metadata,
      records,
    };
  }

  async findOne(id: number) {
    return await this.postRepository.findOneOrFail({ where: { id } });
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    await this.postRepository.update(id, updatePostDto);
    return this.postRepository.findOne({ where: { id } });
  }

  async remove(id: number) {
    return await this.postRepository.delete(id);
  }
}
