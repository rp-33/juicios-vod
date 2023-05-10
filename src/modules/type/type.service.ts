import { 
    Injectable,
    NotFoundException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeRepository } from 'src/repositories/type.repository';
import { Type } from '../../entities/type.entity';
import {
    CreateTypeDto,
    UpdateTypeDto
} from './dto/type.dto';


@Injectable()
export class TypeService {
    constructor(
        @InjectRepository(TypeRepository) private readonly _typeRepository: TypeRepository
    ) {}

    async find() : Promise<Type[]> {  

        const types : Type[] = await this._typeRepository.find();

        return types;
        
    }

    async create(body : CreateTypeDto) : Promise<string> {  

        const {name} = body; 
        
        const types : Type = await this._typeRepository.save({ name });
 
        if(!types.id) throw new NotFoundException('Error al crear');

        return 'Creado con exito';
        
    }

   
    async update(body : UpdateTypeDto) : Promise<string> {

        let {id,name}  = body;

        let updateResult : any = await this._typeRepository.update({ id },{ name });

        if(updateResult.affected === 0) throw new NotFoundException('Error al actualizar');

        return 'Actualizado con exito';
        
    } 
}
