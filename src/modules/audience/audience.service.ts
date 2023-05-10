import { 
    Injectable,
    NotFoundException,
    Response
} from '@nestjs/common';
import { Like } from "typeorm";
import { InjectRepository } from '@nestjs/typeorm';
import { AudienceRepository } from '../../repositories/audience.repository';
import { Audience } from '../../entities/audience.entity';
import { 
    AudienceDto,
    FindDto,
    AudienceUpdateDto,
    AudienceDeleteDto,
    AudienceAssignDto,
    AudienceAssignDeleteDto
 } from './dto/audience.dto';
 import { StorageService } from '../storage/storage.service';
 import { typeImage } from './utils/type_file';

@Injectable()
export class AudienceService {
    constructor(
        @InjectRepository(AudienceRepository) private readonly _audienceRepository: AudienceRepository,
        private readonly _storageService: StorageService
    ) {}

    async find(query : FindDto,user : number) : Promise<{data : Audience[],total : number}> {
        
        const skip : number = Number(query.page) * Number(query.limit);
        
        const [audience,count] : [Audience[],number] = await this._audienceRepository.findAndCount({ 
            where: query.test === '' ? [{user_assign : user}] : [{ title : Like(`%${query.test}%`), user_assign : user } ],
            skip : skip,
            take : Number(query.limit) 
        });

        return {
            data : audience,
            total : count
        }
        
    }

    async findAll(query : FindDto,user:number) : Promise<{data : Audience[],total : number}> {

        const skip : number = Number(query.page) * Number(query.limit);

        const [audience,count] : [Audience[],number] = await this._audienceRepository.findAndCount({ 
            where: query.test === '' ? [{user : user}] : [{ title : Like(`%${query.test}%`), user : user } ],
            skip : skip,
            take : Number(query.limit) 
        });

        return {
            data : audience,
            total : count
        }
        
    }

    async findOne(id : number) : Promise<Audience> {

        const audience : Audience = await this._audienceRepository.findOne({ id });

        return audience;
        
    }
    
    async create(body : AudienceDto,files : any[]) : Promise<Audience> {

        let i : number = 0;
        while(i<files.length) {
            let fileTemporal : any = await this._storageService.uploadFile(files[i]);
            body[typeImage(files[i].originalname)] = fileTemporal;
            i ++;
        }
        const audicence: Audience = await this._audienceRepository.save(body);

        if(!audicence.id) throw new NotFoundException('Error al crear la audiencia');

        return audicence;
        
    }

    async update(body : AudienceUpdateDto,files : any[]) : Promise<string> {

        let {id,...audience}  = body;

        if(files !== undefined) {
            let i : number = 0;
            while(i<files.length) {
                let fileTemporal : any = await this._storageService.uploadFile(files[i]);
                audience[typeImage(files[i].originalname)] = fileTemporal;
                i ++;
            }
        }

        let updateResult : any = await this._audienceRepository.update({ id },audience);

        if(updateResult.affected === 0) throw new NotFoundException('Error al actualizar la audiencia');

        return 'Audiencia actualizada con exito';
        
    }

    async delete(params : AudienceDeleteDto) : Promise<string> {

        let deleteResult : any = await this._audienceRepository.softDelete({ id : params.id});

        if(deleteResult.affected === 0) throw new NotFoundException('Error al eliminar la audiencia');

        return 'Audiencia eliminada con exito';
        
    }

    async download(file : string,res : Response) : Promise<Buffer> {
        file = file.replace(process.env.CLOUDFRONT , process.env.AWS_LOCATION);
        return await this._storageService.downloaddFile(file,res);        
    }

    async assign(body : AudienceAssignDto) : Promise<string> {

        const {id,user} = body

        let updateResult : any = await this._audienceRepository.update({ id },{user_assign : user});

        if(updateResult.affected === 0) throw new NotFoundException('Error al asignar la audiencia');

        return 'Audiencia asignada con exito';
        
    }

    async assignDelete(body : AudienceAssignDeleteDto) : Promise<string> {

        const {id} = body

        let updateResult : any = await this._audienceRepository.update({ id },{user_assign : null});

        if(updateResult.affected === 0) throw new NotFoundException('Error al eliminar la asignacion');

        return 'Asignacion eliminada con exito';
        
    }

}
