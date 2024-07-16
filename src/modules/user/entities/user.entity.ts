
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Post } from 'src/modules/post/entities/post.entity';
import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity({ name: 'users' })
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field({nullable:true})
  Name?: string;

  @Column()
  @Field()
  Email: string;

  @Column()
  @Field()
  Password: string;

  @Field({ nullable: true })
  accessToken?: string;

  @OneToMany(() => Post, (post) => post.user)
  @Field(() => [Post], { nullable: true })
  posts?: Post[];

  @Field(() => Date,{nullable:true})
  @CreateDateColumn({
    type: 'timestamp with time zone',
  })
  createdAt: Date;

  @Field(() => Date,{nullable:true})
  @UpdateDateColumn({
    type: 'timestamp with time zone',
  })
  updatedAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    // console.log('Hello is herer',this.Password);

    this.Password = await bcrypt.hash(this.Password, 10);
  }
}
