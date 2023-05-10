import { 
    Controller,
    Request,
    Query,
    Param,
    Response,
    Body,
    Get,
    Post,
    Put,
    Delete,
    UseGuards,  
    UseInterceptors,
    UploadedFiles,
    UsePipes,
    ValidationPipe
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FilesInterceptor } from '@nestjs/platform-express';
import { AudienceService  } from './audience.service';
import { Audience } from '../../entities/audience.entity';
import { 
    AudienceDto,
    FindDto,
    AudienceDeleteDto,
    AudienceUpdateDto,
    AudienceAssignDto,
    AudienceAssignDeleteDto
 } from './dto/audience.dto';
 import { RoleGuard } from '../roles/guards/role.guard';

@Controller('audience')
export class AudienceController {
    constructor(private readonly _audienceService: AudienceService) {}

    @Get('find')
    @UseGuards(AuthGuard('jwt'))
    @UsePipes(new ValidationPipe())
    find(@Query() query : FindDto,@Request() req: any): Promise<{data : Audience[],total : number}>{
        return this._audienceService.find(query,req.user['id']);
    }

    @Get('find/all')
    @UseGuards(AuthGuard('jwt'),RoleGuard)
    @UsePipes(new ValidationPipe())
    findAll(@Query() query : FindDto,@Request() req: any): Promise<{data : Audience[],total : number}>{
        return this._audienceService.findAll(query,req.user['id']);
    }

    @Get(':id')
    @UseGuards(AuthGuard('jwt'))
    findOne(@Param('id') id : number): Promise<Audience>{
        return this._audienceService.findOne(id);
    }

    @Post('create')
    @UseGuards(AuthGuard('jwt'),RoleGuard)
    @UseInterceptors(FilesInterceptor('file'))
    @UsePipes(new ValidationPipe())
    create(@Request() req: any,@Body() body : AudienceDto,@UploadedFiles() files : any[]): Promise<Audience>{
        body['user'] = req.user['id'];
        return this._audienceService.create(body,files);
    }

    @Put('update')
    @UseGuards(AuthGuard('jwt'),RoleGuard)
    @UseInterceptors(FilesInterceptor('file'))
    @UsePipes(new ValidationPipe())
    update(@Body() body : AudienceUpdateDto,@UploadedFiles() files : any[]): Promise<string>{
        return this._audienceService.update(body,files);
    }

    @Delete('delete/:id')
    @UseGuards(AuthGuard('jwt'),RoleGuard)
    delete(@Param() params : AudienceDeleteDto): Promise<string>{
        return this._audienceService.delete(params);
    }

    @Post('download')
    @UseGuards(AuthGuard('jwt'))
    @UsePipes(new ValidationPipe())
    download(@Body('file') file : string,@Response() res : Response): Promise<Buffer>{  
        return this._audienceService.download(file,res);
    }

    @Put('assign')
    @UseGuards(AuthGuard('jwt'),RoleGuard)
    @UsePipes(new ValidationPipe())
    assign(@Body() body : AudienceAssignDto): Promise<string>{
        return this._audienceService.assign(body);
    }

    @Put('assign/delete')
    @UseGuards(AuthGuard('jwt'),RoleGuard)
    @UsePipes(new ValidationPipe())
    assignDelete(@Body() body : AudienceAssignDeleteDto): Promise<string>{
        return this._audienceService.assignDelete(body);
    }

}
