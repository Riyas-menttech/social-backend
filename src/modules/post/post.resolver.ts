import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PostService } from './post.service';
import { Post } from './entities/post.entity';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { UseGuards } from '@nestjs/common';
import { UserAuthGuard } from 'src/guards/user.guard';

@Resolver(() => Post)
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Mutation(() => Post)
  @UseGuards(UserAuthGuard)
  createPost(@Args('createPostInput') createPostInput: CreatePostInput) {
    return this.postService.createPost(createPostInput);
  }

  @Query(() => [Post])
  @UseGuards(UserAuthGuard)
  findAllPost() {
    return this.postService.findAllPost();
  }

  @Query(() => Post)
  @UseGuards(UserAuthGuard)
  findOnePost(@Args('id', { type: () => Int }) id: number) {
    return this.postService.findOnePost(id);
  }

  @Mutation(() => Post)
  @UseGuards(UserAuthGuard)
  updatePost(@Args('updatePostInput') updatePostInput: UpdatePostInput) {
    return this.postService.update(updatePostInput.id, updatePostInput);
  }

  @Mutation(() => Post)
  @UseGuards(UserAuthGuard)
  removePost(@Args('id', { type: () => Int }) id: number) {
    return this.postService.remove(id);
  }
}
