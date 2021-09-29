import { Module } from '@nestjs/common';
import { UserService } from './User.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from './user.entity';

@Module({
	imports: [TypeOrmModule.forFeature([User])],
	providers: [UserService],
	exports: [UserService]
})
export class UserModule { }