import { 
    Post,
    Put,
    Body,
    Get,
    Controller 
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { Role } from '../../entities/role.entity';
import {
    CreateRolDto,
    UpdateRolDto
} from './dto/roles.dto';

@Controller('roles')
export class RolesController {
    constructor(private readonly _rolesService: RolesService) {}

    @Get('find')
    find(): Promise<Role[]>{
        return this._rolesService.find();
    }

    @Post('create')
    create(@Body() body : CreateRolDto): Promise<string>{
        return this._rolesService.create(body);
    }

    @Put('update')
    edit(@Body() body :  UpdateRolDto): Promise<string>{
        return this._rolesService.update(body);
    }
}
