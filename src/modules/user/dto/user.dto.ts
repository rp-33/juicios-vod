import { 
    IsNotEmpty,
    IsString,
    IsOptional,
} from 'class-validator';

export class UserEditDto {

    @IsString()
    @IsNotEmpty()
    id : number;

    @IsString()
    @IsOptional()
    @IsNotEmpty()
    name : string;

    @IsString()
    @IsOptional()
    @IsNotEmpty()
    last_name : string;

    @IsString()
    @IsOptional()
    @IsNotEmpty()
    curp : number;

    @IsString()
    @IsOptional()
    @IsNotEmpty()
    status : number;

}


export class FindDto {

    @IsNotEmpty()
    @IsString()
    page : number;

    @IsNotEmpty()
    @IsString()
    limit : number;

}

export class ChangeStatusDto {

    @IsNotEmpty()
    @IsString()
    email : string;

}