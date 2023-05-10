import { 
    Injectable,
    NotFoundException,
    HttpException
} from '@nestjs/common';
import { Like } from "typeorm";
import { InjectRepository } from '@nestjs/typeorm';
import { ExpedientRepository } from '../../repositories/expedient.repository';
import { Expedient } from '../../entities/expedient.entity';
import { 
    ExpedientDto,
    FindDto,
    ExpedientUpdateDto,
    ExpedientDeleteDto
 } from './dto/expedient.dto';

@Injectable()
export class ExpedientService {
    constructor(
        @InjectRepository(ExpedientRepository) private readonly _expedientRepository: ExpedientRepository
    ) {}

    async find(query : FindDto,user : number) : Promise<{data : Expedient[],total : number}> {

        const skip : number = Number(query.page) * Number(query.limit);

        const [expedient,count] : [Expedient[],number] = await this._expedientRepository.findAndCount({ 
            where: query.test === '' ? [{user : user}] : [{ title : Like(`%${query.test}%`),user : user },{ code : Like(`%${query.test}%`),user : user  } ],
            skip : skip,
            take : Number(query.limit),
            relations : ['type']
        });
    
        return {
            data : expedient,
            total : count
        }
        
    }

    async findAll(query : FindDto) : Promise<{data : Expedient[],total : number}> {

        const skip : number = Number(query.page) * Number(query.limit);

        const [expedient,count] : [Expedient[],number] = await this._expedientRepository.findAndCount({ 
            where: query.test === '' ? null : [{ title : Like(`%${query.test}%`) },{ code : Like(`%${query.test}%`) } ],
            skip : skip,
            take : Number(query.limit),
            relations : ['type']
        });
    
        return {
            data : expedient,
            total : count
        }
        
    }
    

    async create(body : ExpedientDto) : Promise<Expedient> {

        const findExpedient : Expedient = await this._expedientRepository.findOne({ 
            where : { code : body.code }
        });

        if (findExpedient) throw new HttpException('Codigo del expediente ya existe',400);

        const expedient : Expedient = await this._expedientRepository.save(body);

        if(!expedient.id) throw new NotFoundException('Error al crear el expedient');

        return expedient;
        
    }

    async update(body : ExpedientUpdateDto) : Promise<string> {

        let {id,...expedient}  = body;

        let updateResult : any = await this._expedientRepository.update({ id },expedient);

        if(updateResult.affected === 0) throw new NotFoundException('Error al actualizar el expediente');

        return 'Expediente actualizado con exito';
        
    }

    async delete(params : ExpedientDeleteDto) : Promise<string> {
        
        let deleteResult : any = await this._expedientRepository.softDelete({ id : params.id});

        if(deleteResult.affected === 0) throw new NotFoundException('Error al eliminar el expediente');

        return 'Expediente eliminado con exito';
        
    }

}
