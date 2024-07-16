import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Comment } from './comment.entity';
import { Reply } from './reply.entity';
import { User } from 'src/modules/user/entities/user.entity';

@Entity({ name: 'posts' })
@ObjectType()
export class Post {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field({ nullable: true })
  description: string;

  @Column()
  @Field()
  userId: number;

  @ManyToOne(() => User, { eager: true, cascade: true })
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  @Field(() => User, { nullable: true })
  user?: User;

  @Column({ nullable: true })
  @Field({ nullable: true })
  image?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  video?: string; // Corrected the capitalization to match the field in the error message
  
  @Column('simple-array', { nullable: true, array: true})
  @Field(() => [Comment], { nullable: true })
  comments?: Comment[];

  @Column('simple-array', { nullable: true, array: true })
  @Field(() => [Reply], { nullable: true })
  replies?: Reply[]; 

  @Column('simple-array', {
    nullable: true,
  })
  @Field(() => [Int], { nullable: true })
  likes?: number[]; 

  @Column('simple-array', {
    nullable: true,
  })
  @Field(() => [Int], { nullable: true })
  dislikes?: number[];
}
