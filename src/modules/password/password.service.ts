import { 
    Injectable,
    NotFoundException
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';
import { UserRepository } from '../../repositories/user.repository';
import { JwtPayload } from '../auth/interface/jwt.payload';
import { MailService } from '../mail/mail.service';
import * as bcrypt from 'bcrypt';
import {
    PasswordRecoverDto,
    PasswordChangeDto,
    EmailDto
} from './dto/password.dto';

@Injectable()
export class PasswordService {
    constructor(
        @InjectRepository(UserRepository) private readonly _userRepository: UserRepository,
        private readonly _jwtService: JwtService,
        private readonly _mailService: MailService
    ) {}

    async generateAccessToken(email : string) : Promise<string> {
        const user = await this._userRepository.findOne({
            where : [{ email }]
        });

        if(!user) throw new NotFoundException();

        const payload: JwtPayload = { id : user.id };

        return this._jwtService.sign(payload);
    }

    async hashPassword(password : string) : Promise<string> {
        const salt : string = await bcrypt.genSalt();
        return await bcrypt.hash(password, salt);
    }

    async validatePassword(password : string, hashPassword :  string): Promise<boolean> {

        return await bcrypt.compareSync(password,hashPassword);
    }

    async send(query : EmailDto) : Promise<string> {

        const {email} = query;

        let token : string = await this.generateAccessToken(email);

        await this._mailService.sendEmailPassword('Recuperar clave de acceso.',email,token);

        return 'Se envio un mensaje a su correo';
    }

    async recover(body : PasswordRecoverDto) : Promise<string> { 

        const {id,password} = body;

        const hash =  await this.hashPassword(password);

        const updateResult : any =  await this._userRepository.update({id},{password : hash});

        if(updateResult.affected === 0) throw new NotFoundException('Error al actualizar la clave');

        return 'Su clave fue cambiada exitosamente';
    }

    async change(body : PasswordChangeDto) : Promise<string> { 

        const {id,oldPassword,newPassword} = body;

        const user: User = await this._userRepository.findOne({
            where : [{ id  }]
        });

        if (!user) throw new NotFoundException('Correo o clave invalida!');

        let validatePass : boolean = await this.validatePassword(oldPassword,user.password);

        if(!validatePass) throw new NotFoundException('Clave antigua invalida!');

        const hash =  await this.hashPassword(newPassword);

        const updateResult : any =  await this._userRepository.update({id},{password : hash});

        if(updateResult.affected === 0) throw new NotFoundException('Error al actualizar la clave');

        return 'Su clave fue cambiada exitosamente';
    }
}
