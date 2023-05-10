import { 
    Controller,
    Request,
    Body,
    Param,
    Get,
    Post,
    Put,
    Delete,
    UseGuards
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TranscriptionAudienceService  } from './transcription-audience.service';
import { TranscriptionAudience } from '../../entities/transcription-audience.entity';
import {
    TranscriptionDeleteDto,
    TranscriptionUpdateDto,
    TranscriptionCreateDto
} from './dto/transcription-audience.dto'

@Controller('transcription-audience')
export class TranscriptionAudienceController {
    constructor(private readonly _transcriptionAudienceService : TranscriptionAudienceService) {}

    @Get(':audience')
    @UseGuards(AuthGuard('jwt'))
    find(@Param('audience') audience : number): Promise<TranscriptionAudience>{
        return this._transcriptionAudienceService.findOne(audience);
    }

    @Post('create')
    @UseGuards(AuthGuard('jwt'))
    create(@Request() req: any,@Body() body :  TranscriptionCreateDto): Promise<TranscriptionAudience>{
        body['user'] = req.user['id'];
        return this._transcriptionAudienceService.create(body);
    }

    @Put('update')
    @UseGuards(AuthGuard('jwt'))
    update(@Body() body : TranscriptionUpdateDto): Promise<string>{
        return this._transcriptionAudienceService.update(body);
    }

    @Delete('delete/:id')
    @UseGuards(AuthGuard('jwt'))
    delete(@Param() params : TranscriptionDeleteDto): Promise<string>{
        return this._transcriptionAudienceService.delete(params);
    }


}
