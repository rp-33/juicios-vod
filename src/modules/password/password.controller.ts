import { 
    Controller,
    Put,
    Get,
    Body,
    Query,
    Request,
    UsePipes,
    ValidationPipe,
    UseGuards
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PasswordService } from './password.service';
import {
    PasswordRecoverDto,
    PasswordChangeDto,
    EmailDto
} from './dto/password.dto';

@Controller('password')
export class PasswordController {
    constructor(private readonly _passwordService: PasswordService) {}

    @Get('send')
    @UsePipes(new ValidationPipe())
    send(@Query() query : EmailDto): Promise<string>{
        return this._passwordService.send(query);
    }

    @Put('recover')
    @UseGuards(AuthGuard('jwt'))
    @UsePipes(new ValidationPipe())
    recover(@Request() req : any,@Body() body : PasswordRecoverDto): Promise<string>{
        body['id'] = req.user['id'];
        return this._passwordService.recover(body);
    }

    @Put('change')
    @UseGuards(AuthGuard('jwt'))
    @UsePipes(new ValidationPipe())
    change(@Request() req : any,@Body() body : PasswordChangeDto): Promise<string>{
        body['id'] = req.user['id'];
        return this._passwordService.change(body);
    }

}
