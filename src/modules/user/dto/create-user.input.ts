import { Field, InputType, } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field({nullable:true})
  @IsNotEmpty()
  @IsString()
  Name?: string;

  @Field()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(20)
  @IsEmail()
  Email: string;

  @Field()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(20)
  @IsString()
  Password: string;
}
