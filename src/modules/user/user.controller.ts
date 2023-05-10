import { 
    Controller,
    Put,
    UseGuards,
    Body,
    Get,
    Request,
    Query,
    UsePipes,
    ValidationPipe
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService  } from './user.service';
import { 
    UserEditDto,
    FindDto,
    ChangeStatusDto
} from './dto/user.dto';
import { User } from 'src/entities/user.entity';
import { RoleGuard } from '../roles/guards/role.guard';

@Controller('user')
export class UserController {
    constructor(private readonly _userService: UserService) {}

    @Get('me')
    @UseGuards(AuthGuard('jwt'))
    @UsePipes(new ValidationPipe())
    findOne(@Request() req: any): Promise<User>{
        return this._userService.findOne(req.user["id"]);
    }

    @Put('edit')
    @UseGuards(AuthGuard('jwt'))
    @UsePipes(new ValidationPipe())
    update(@Body() body : UserEditDto): Promise<string>{
        return this._userService.update(body);
    }

    @Get('find')
    @UseGuards(AuthGuard('jwt'),RoleGuard)
    @UsePipes(new ValidationPipe())
    findAll(@Query() query : FindDto): Promise<{data : User[],total : number}>{
        return this._userService.findAll(query);
    }

    @Put('change/status')
    @UseGuards(AuthGuard('jwt'),RoleGuard)
    @UsePipes(new ValidationPipe())
    changeStatus(@Body() body : ChangeStatusDto): Promise<string>{
        return this._userService.changeStatus(body);
    }

}
