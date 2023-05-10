import { 
    NotFoundException,
    Injectable 
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleRepository } from 'src/repositories/role.repository';
import { Role } from '../../entities/role.entity';
import {
    CreateRolDto,
    UpdateRolDto
} from './dto/roles.dto';

@Injectable()
export class RolesService {
    constructor(
        @InjectRepository(RoleRepository) private readonly _roleRepository: RoleRepository
    ) {}

    async find() : Promise<Role[]> {  

        const roles : Role[] = await this._roleRepository.find();

        return roles
        
    }

    async create(body : CreateRolDto) : Promise<string> {  

        const {name} = body; 
        
        const roles : Role = await this._roleRepository.save({ name });
 
        if(!roles.id) throw new NotFoundException('Error al crear el rol');

        return 'Rol creado con exito';
        
    }

   
    async update(body : UpdateRolDto) : Promise<string> {

        let {id,...role}  = body;

        let updateResult : any = await this._roleRepository.update({ id },role);

        if(updateResult.affected === 0) throw new NotFoundException('Error al actualizar el rol');

        return 'Rol actualizado con exito';
        
    } 

}
