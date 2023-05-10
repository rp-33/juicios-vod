import { 
    IsNotEmpty,
    IsString
} from 'class-validator';
import { Expedient } from 'src/entities/expedient.entity';
import { User } from 'src/entities/user.entity';

export class AudienceDto {

    @IsString()
    @IsNotEmpty()
    title : string;

    @IsNotEmpty()
    expedient : Expedient;

}

export class FindDto {

    @IsString()
    test : string;

    @IsNotEmpty()
    @IsString()
    page : number;

    @IsNotEmpty()
    @IsString()
    limit : number;

}

export class AudienceDeleteDto {

    @IsNotEmpty()
    @IsString()
    id : number;

}

export class AudienceUpdateDto {

    @IsNotEmpty()
    @IsString()
    id : number;

    @IsNotEmpty()
    @IsString()
    title : string;

}

export class AudienceAssignDto {

    @IsNotEmpty()
    @IsString()
    id : number;

    @IsNotEmpty()
    user : User;

}

export class AudienceAssignDeleteDto {

    @IsNotEmpty()
    @IsString()
    id : number;

}