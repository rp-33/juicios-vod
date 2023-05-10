import { 
    IsNotEmpty,
    IsString,
    IsEmail,
    Length
} from 'class-validator';
import { Role } from '../../../entities/role.entity'

export class LoginDto {
    @IsEmail()
    @IsNotEmpty()
    email : string;

    @IsString()
    @IsNotEmpty()
    password : string;
}

export class SignupDto {
    @IsString()
    @IsNotEmpty()
    name : string;

    @IsString()
    @IsNotEmpty()
    last_name : string;

    @IsNotEmpty()
    curp : number;

    @IsEmail()
    @IsNotEmpty()
    email : string;

    @IsString()
    @Length(1, 8)
    password : string;

    @IsNotEmpty()
    rol : Role;

}

export class UserDto {
    @IsNotEmpty()
    id : number;

    @IsString()
    @IsNotEmpty()
    name : string;

    @IsString()
    @IsNotEmpty()
    last_name : string;

    @IsNotEmpty()
    curp : number;

    @IsString()
    @IsEmail()
    email : string;

    @IsNotEmpty()
    status : number;

    @IsString()
    @IsNotEmpty()
    token : string;

}


