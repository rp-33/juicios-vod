import { 
    IsNotEmpty,
    IsString
} from 'class-validator';

export class CreateTypeDto {

    @IsString()
    @IsNotEmpty()
    name : string; 
    
}

export class UpdateTypeDto {

    @IsString()
    @IsNotEmpty()
    id : number; 

    @IsString()
    @IsNotEmpty()
    name : string; 
    
}