import { 
    Injectable,
    NotFoundException,
    HttpException,
    UnauthorizedException
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../../repositories/user.repository';
import { User } from '../../entities/user.entity';
import  {
    LoginDto,
    SignupDto,
    UserDto
} from './dto/auth.dto';
import { JwtPayload } from './interface/jwt.payload';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository) private readonly _userRepository: UserRepository,
        private readonly _jwtService: JwtService
    ) {}

    async generateAccessToken(id: number) : Promise<string> {
        const user = await await this._userRepository.findOne({
            where : [{ id }]
        });

        if(!user) throw new NotFoundException();

        const payload: JwtPayload = { id : id };

        return this._jwtService.sign(payload);
    }

    async getUserById(id: number): Promise<User>{
        const user : User =  await this._userRepository.findOne({
            where : [{ id }],
            relations : ['rol'],
            select : ['id','rol']
        });

        if(!user) throw new NotFoundException();

        return user;
    }

    async hashPassword(password : string) : Promise<string> {
        const salt : string = await bcrypt.genSalt();
        return await bcrypt.hash(password, salt);
    }

    async validatePassword(password : string, hashPassword :  string): Promise<boolean> {

        return await bcrypt.compareSync(password,hashPassword);
    }

    async login(body: LoginDto): Promise<UserDto> {

        const user: User = await this._userRepository.findOne({
            where : [{ email : body.email  }]
        });

        if (!user) throw new NotFoundException('Correo o clave invalida!');

        let validatePass : boolean = await this.validatePassword(body.password,user.password);

        if(!validatePass) throw new NotFoundException('Correo o clave invalida!');

        //if(user.status === 0) throw new UnauthorizedException('No esta dado de alta');

        const token : string = await this.generateAccessToken(user.id);
        
        return {
            id : user.id,
            name : user.name,
            last_name : user.last_name,
            email : user.email,
            curp : user.curp,
            status : user.status,
            token : token
        }
        
    }

    async signup(body: SignupDto): Promise<UserDto> {

        const userId : User = await this._userRepository.findOne({
            where : [
                { email : body.email },
                { curp : body.curp }
            ],
            select : ['id']
        });

        if(userId) throw new HttpException('Ya existe el correo o curp.', 400);

        body.password = await this.hashPassword(body.password);

        const user: User = await this._userRepository.save(body);

        if (!user.id) throw new NotFoundException('No se pudo guardar el usuario.');

        const token:string = await this.generateAccessToken(user.id);

        return {
            id : user.id,
            name : user.name,
            last_name : user.last_name,
            email : user.email,
            curp : user.curp,
            status : user.status,
            token : token
        }
        
    }
    
}
