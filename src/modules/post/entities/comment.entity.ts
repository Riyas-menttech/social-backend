import { Field, Int, ObjectType } from "@nestjs/graphql";
import { User } from "src/modules/user/entities/user.entity";
import { JoinColumn, ManyToOne } from "typeorm";

@ObjectType()
export class Comment {
    @Field(() => Int,{nullable:true})
    userId: number
    
    @Field()
    commentText: string
    
    @ManyToOne(() => User)
    @JoinColumn({ name: "userId", referencedColumnName: "id"})
    user:User
}