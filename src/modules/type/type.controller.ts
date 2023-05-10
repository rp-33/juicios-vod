import { 
    Post,
    Put,
    Body,
    Get,
    Controller,
    UseGuards,
    UsePipes,
    ValidationPipe
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TypeService } from './type.service';
import { Type } from '../../entities/type.entity';
import {
    CreateTypeDto,
    UpdateTypeDto
} from './dto/type.dto';


@Controller('type')
export class TypeController {
    constructor(private readonly _typeService: TypeService) {}

    @Get('find')
    @UseGuards(AuthGuard('jwt'))
    @UsePipes(new ValidationPipe())
    find(): Promise<Type[]>{
        return this._typeService.find();
    }

    @Post('create')
    @UseGuards(AuthGuard('jwt'))
    @UsePipes(new ValidationPipe())
    create(@Body() body : CreateTypeDto): Promise<string>{
        return this._typeService.create(body);
    }

    @Put('update')
    @UseGuards(AuthGuard('jwt'))
    @UsePipes(new ValidationPipe())
    edit(@Body() body : UpdateTypeDto): Promise<string>{
        return this._typeService.update(body);
    }
}
