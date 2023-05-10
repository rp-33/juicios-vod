import { 
    IsNotEmpty,
    IsString
} from 'class-validator';

export class CreateRolDto {

    @IsString()
    @IsNotEmpty()
    name : string; 
    
}

export class UpdateRolDto {

    @IsString()
    @IsNotEmpty()
    id : number; 

    @IsString()
    @IsNotEmpty()
    name : string; 
    
}