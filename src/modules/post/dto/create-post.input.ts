import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString, IsArray, IsInt } from 'class-validator';


@InputType()
export class CommentDto {
  @Field(() => Number,{nullable:true})
  @IsInt()
  userId?: number;

  @Field({nullable:true})
  @IsNotEmpty()
  @IsString()
  commentText?: string;
}
@InputType()
export class ReplyDto {
  @Field(() => Number,{nullable:true})
  @IsInt()
  userId?: number;

  @Field()
  @IsNotEmpty()
  @IsString()
  replyText: string;
}
@InputType()
export class CreatePostInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  description: string;

  @Field()
  @IsOptional()
  @IsString()
  image?: string;

  @Field()
  @IsNotEmpty()
  @IsInt()
  userId: number;
  
  @Field()
  @IsOptional()
  @IsString()
  video?: string;

  @Field(() => CommentDto, { nullable: true })
  @IsOptional()
  @IsArray()
  comments?: CommentDto[];

  @Field(() => ReplyDto, { nullable: true })
  @IsOptional()
  @IsArray()
  replies?: ReplyDto[];

  @Field(() => [Number], { nullable: true })
  @IsOptional()
  @IsArray()
  likes?: number[];

  @Field(() => [Number], { nullable: true })
  @IsOptional()
  @IsArray()
  dislikes?: number[];
}

