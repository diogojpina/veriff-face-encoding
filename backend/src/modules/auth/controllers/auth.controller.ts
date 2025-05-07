import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LoginDto } from '../dtos';
import { IsPublic } from '../../../common';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @IsPublic()
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
