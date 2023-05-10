import { 
    IsNotEmpty,
    IsString,
    IsOptional,
    IsNumber,
    IsPositive
} from 'class-validator';

export class EmailDto {

    @IsString()
    @IsNotEmpty()
    email : string; 
    
}

export class PasswordChangeDto {

    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    @IsOptional()
    id : number;
    
    @IsString()
    @IsNotEmpty()
    newPassword : string;

    @IsString()
    @IsNotEmpty()
    oldPassword : string;

}

export class PasswordRecoverDto {

    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    @IsOptional()
    id : number;

    @IsString()
    @IsNotEmpty()
    password : string;

}