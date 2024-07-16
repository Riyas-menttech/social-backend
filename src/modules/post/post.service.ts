import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostService {
  constructor(@InjectRepository(Post) private postRepo:Repository<Post>){}
  async createPost(createPostInput: CreatePostInput) {
    const post = this.postRepo.create(createPostInput)
    return  await this.postRepo.save(post)
  }

  findAllPost() {
    return this.postRepo.find()
  }

  findOnePost(id: number) {
       return this.postRepo.findBy({id:id});
  }

  async update(id: number, updatePostInput: UpdatePostInput) {
    const post = this.postRepo.findBy({ id })
    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    // const editpost = await this.postRepo.save({ id: id, updatePostInput });
    await this.postRepo.update({ id }, updatePostInput);

    const newpost = await this.postRepo.findBy({ id });
    console.log(newpost[0]);
    
    return newpost[0]
    
  }

  remove(id: number) {
    return this.postRepo.delete({id});
  }
}
