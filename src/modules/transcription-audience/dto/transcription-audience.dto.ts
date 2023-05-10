import { 
    IsNotEmpty,
    IsString
} from 'class-validator';
import {  Audience } from '../../../entities/audience.entity';


export class TranscriptionCreateDto {

    @IsNotEmpty()
    @IsString()
    audience : Audience;

    @IsNotEmpty()
    @IsString()
    transcription : string;


}

export class TranscriptionDeleteDto {

    @IsNotEmpty()
    @IsString()
    id : number;

}

export class TranscriptionUpdateDto {

    @IsNotEmpty()
    @IsString()
    id : number;

    @IsNotEmpty()
    @IsString()
    transcription : string;


}