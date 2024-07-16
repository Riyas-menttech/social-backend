import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private UserRepo: Repository<User>,
    private jwtService: JwtService,
  ) {}
  async signup(createUserInput: CreateUserInput) {
    const { Email } = createUserInput
    const userExist = await this.UserRepo.findBy({ Email: Email })
    console.log(userExist,Email);
    
    if (userExist.length) {
       throw new Error('Already Exist email')
    }
    const user =   this.UserRepo.create(createUserInput);
    const userDetail =  await this.UserRepo.save(user);
    return  userDetail;
  }

  async signIn(createUserInput: CreateUserInput) {
   const { Email, Password } : any = createUserInput;
    const user : any = await this.UserRepo.findOne({ where: { Email } });

    if (user && (await bcrypt.compare(Password, user.Password))) {
      
      const payload = { Email };
      const accessToken =  this.jwtService.sign(payload);
      return { accessToken,...user };
    } else {
      throw new UnauthorizedException('Please check your login credentials');
    }
  }
  

  findAll() {
    return this.UserRepo.find();
  }

  findOne(id: number) {
    return this.UserRepo.findBy({id:id});
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
