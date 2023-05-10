import { 
    Controller,
    Request,
    Query,
    Body,
    Get,
    Post,
    Put,
    Delete,
    Param,
    UseGuards,
    UsePipes,
    ValidationPipe
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ExpedientService  } from './expedient.service';
import { Expedient } from '../../entities/expedient.entity';
import { 
    ExpedientDto,
    FindDto,
    ExpedientUpdateDto,
    ExpedientDeleteDto
 } from './dto/expedient.dto';
 import { RoleGuard } from '../roles/guards/role.guard';

@Controller('expedient')
export class ExpedientController {
    constructor(private readonly _expedientService: ExpedientService) {}

    @Get('find')
    @UseGuards(AuthGuard('jwt'))
    @UsePipes(new ValidationPipe())
    find(@Query() query : FindDto,@Request() req: any): Promise<{data : Expedient[],total : number}>{
        return this._expedientService.find(query,req.user['id']);
    }

    @Get('find/all')
    @UseGuards(AuthGuard('jwt'),RoleGuard)
    @UsePipes(new ValidationPipe())
    findAll(@Query() query : FindDto): Promise<{data : Expedient[],total : number}>{
        return this._expedientService.findAll(query);
    }

    @Post('create')
    @UseGuards(AuthGuard('jwt'),RoleGuard)
    @UsePipes(new ValidationPipe())
    create(@Request() req: any,@Body() body : ExpedientDto): Promise<Expedient>{
        body['user'] = req.user['id'];
        return this._expedientService.create(body);
    }

    @Put('update')
    @UseGuards(AuthGuard('jwt'),RoleGuard)
    @UsePipes(new ValidationPipe())
    update(@Body() body : ExpedientUpdateDto): Promise<string>{
        return this._expedientService.update(body);
    }

    @Delete('delete/:id')
    @UseGuards(AuthGuard('jwt'),RoleGuard)
    @UsePipes(new ValidationPipe())
    delete(@Param() params : ExpedientDeleteDto): Promise<string>{
        return this._expedientService.delete(params);
    }
}
