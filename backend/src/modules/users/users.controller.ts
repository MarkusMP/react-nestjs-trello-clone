import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { GetCurrentUser } from '../../common/decorators';
import { AuthenticatedGuard, LocalAuthGuard } from '../../common/guards';
import { CreateUserDto, LoginUserDto, UpdateUserDto } from './dtos';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  register(@Body() dto: CreateUserDto): Promise<{ message: string }> {
    return this.usersService.register(dto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() dto: LoginUserDto): Promise<User> {
    return this.usersService.login(dto);
  }

  @UseGuards(AuthenticatedGuard)
  @Delete('logout')
  logout(@Req() req: Request): { message: string } {
    req.logout();

    return {
      message: 'Successful logout',
    };
  }

  @Patch()
  async updateUser(@Body() dto: UpdateUserDto, @GetCurrentUser() user: User) {
    return this.usersService.updateUser(dto, user.id);
  }

  @UseGuards(AuthenticatedGuard)
  @Get()
  async getUser(@GetCurrentUser() user: User): Promise<User> {
    return this.usersService.getUser(user.id);
  }

  @Delete()
  async deleteUser(
    @GetCurrentUser() user: User,
    @Req() req: Request,
  ): Promise<{ message: string }> {
    req.logout();
    return this.usersService.deleteUser(user.id);
  }
}
