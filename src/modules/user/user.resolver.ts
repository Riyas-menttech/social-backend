import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UseGuards } from '@nestjs/common';
import { UserAuthGuard } from 'src/guards/user.guard';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  async signIn(@Args('createUserInput') createUserInput: CreateUserInput) {
    return await this.userService.signup(createUserInput);
  }

  @Mutation(() => User)
  logIn(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.signIn(createUserInput);
  }

  @Query(() => [User])
  @UseGuards(UserAuthGuard)
  findAllUsers() {
    return this.userService.findAll();
  }

  @Query(() => User)
  findOneUser(@Args('id', { type: () => Int }) id: number) {
    return this.userService.findOne(id);
  }

  @Mutation(() => User)
  @UseGuards(UserAuthGuard)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.userService.update(updateUserInput.id, updateUserInput);
  }

  @Mutation(() => User)
  @UseGuards(UserAuthGuard)
  removeUser(@Args('id', { type: () => Int }) id: number) {
    return this.userService.remove(id);
  }
}
