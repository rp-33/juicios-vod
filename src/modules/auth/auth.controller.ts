import { 
    Controller,
    Post,
    Body,
    UsePipes,
    ValidationPipe
} from '@nestjs/common';
import  {
    LoginDto,
    SignupDto,
    UserDto
} from './dto/auth.dto';
import { AuthService  } from './auth.service';


@Controller('auth')
export class AuthController {
    constructor(private readonly _authService: AuthService) {}

    @Post('login')
    @UsePipes(new ValidationPipe())
    login(@Body() body : LoginDto): Promise<UserDto>{
        return this._authService.login(body);
    }

    @Post('signup')
    @UsePipes(new ValidationPipe())
    signupClient(@Body() body : SignupDto):Promise<UserDto>{
        return this._authService.signup(body);
    }
}
