import { 
    IsNotEmpty,
    IsString,
    IsOptional
} from 'class-validator';
import { Type } from '../../../entities/type.entity'

export class ExpedientDto {

    @IsString()
    @IsNotEmpty()
    title : string;

    @IsString()
    @IsNotEmpty()
    code : string;

    @IsNotEmpty()
    type : Type;

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

export class ExpedientDeleteDto {

    @IsNotEmpty()
    @IsString()
    id : number;

}

export class ExpedientUpdateDto {

    @IsNotEmpty()
    @IsString()
    id : number;

    @IsNotEmpty()
    @IsString()
    @IsOptional()
    title : string;

    @IsNotEmpty()
    @IsString()
    @IsOptional()
    code : string;

    @IsNotEmpty()
    @IsOptional()
    type : Type;


}