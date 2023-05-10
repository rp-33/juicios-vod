import { 
    Injectable,
    HttpException,
    NotFoundException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TranscriptionAudience } from '../../entities/transcription-audience.entity';
import { TranscriptionAudienceRepository } from 'src/repositories/transcription-audicence.repository';
import {
    TranscriptionDeleteDto,
    TranscriptionUpdateDto,
    TranscriptionCreateDto
} from './dto/transcription-audience.dto'

@Injectable()
export class TranscriptionAudienceService {
    constructor(
        @InjectRepository(TranscriptionAudienceRepository) private readonly _transcriptionAudienceRepository : TranscriptionAudienceRepository
    ) {}

    async findOne(audience_id : number) : Promise<TranscriptionAudience> {

        const transcriptionAudience : TranscriptionAudience = await this._transcriptionAudienceRepository.findOne({ 
            where :   { 'audience' : audience_id },
            relations : ['audience']
        });

        return transcriptionAudience;
        
    }

    async create(body : TranscriptionCreateDto) : Promise<TranscriptionAudience> {

        const findTranscription : TranscriptionAudience = await this._transcriptionAudienceRepository.findOne({ 
            where : { 'audience' : body.audience}          
        });

        if (findTranscription) throw new HttpException('Ya existe una transcripcion para esta audicencia',400);

        const transcriptionAudience : TranscriptionAudience = await this._transcriptionAudienceRepository.save(body);

        if(!transcriptionAudience.id) throw new NotFoundException('Error al crear la transcripcion');

        return transcriptionAudience;
        
    }

    async update(body : TranscriptionUpdateDto) : Promise<string> {

        let {id,...transcription}  = body;

        let updateResult : any = await this._transcriptionAudienceRepository.update({ id },transcription);

        if(updateResult.affected === 0) throw new NotFoundException('Error al actualizar la transcripcion');

        return 'Transcripcion actualizado con exito';
        
    }


    async delete(params : TranscriptionDeleteDto) : Promise<string> {
        
        let deleteResult : any = await this._transcriptionAudienceRepository.delete({ id : params.id});

        if(deleteResult.affected === 0) throw new NotFoundException('Error al eliminar la transcripcion');

        return 'Transcripcion eliminada con exito';
        
    }


}
