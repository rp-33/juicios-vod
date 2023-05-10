import { 
    Injectable,
    NotFoundException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/repositories/user.repository';
import { User } from 'src/entities/user.entity';
import { MailService } from '../mail/mail.service';
import { 
    UserEditDto,
    FindDto,
    ChangeStatusDto
} from './dto/user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserRepository) private readonly _userRepository: UserRepository,
        private readonly _mailService: MailService
    ) {}
    

    async findOne(id : number) : Promise<User> {  
        
        const user : User = await this._userRepository.findOne({
            where : [{ id : id }],
            select : ['id','email','name','last_name','curp','status']
        });      
        
        return user;
        
    }

    async update(body : UserEditDto) : Promise<string> {  

        const {id,...user} = body; 
        
        let updateResult : any = await this._userRepository.update({ id },user);

        if(updateResult.affected === 0) throw new NotFoundException('Error al editar usuario');

        return 'Usuario editado con exito';     
    }

    async findAll(query : FindDto) : Promise<{data : User[],total : number}> {  

        const skip : number = Number(query.page) * Number(query.limit);
        
        const [user,count] : [User[],number] = await this._userRepository.findAndCount({
            skip : skip,
            take : Number(query.limit),
            where : [{ rol : 2 }],
            relations : ['rol'],
            select : ['id','email','name','last_name','curp','status','rol']
        });      
        
        return {
            data : user,
            total : count
        }
        
    }

    async changeStatus(body : ChangeStatusDto) : Promise<string> {  

        const {email} = body;
        
        let updateResult : any = await this._userRepository.update({ email },{ status  : 1});

        if(updateResult.affected === 0) throw new NotFoundException('Error al editar usuario');

        await this._mailService.sendEmailStatusInvitation('Bienvenido a juicios vod',email);

        return 'Usuario editado con exito';     
    }   


}
