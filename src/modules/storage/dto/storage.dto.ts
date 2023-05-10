import { 
    IsNotEmpty,
    IsString,
} from 'class-validator';;

export class fileDto {

    @IsNotEmpty()
    @IsString()
    fieldname : string;

    @IsNotEmpty()
    @IsString()
    originalname : string;

    @IsNotEmpty()
    @IsString()
    encoding : string;

    @IsNotEmpty()
    @IsString()
    mimetype : string;

    @IsNotEmpty()
    @IsString()
    buffer : Buffer;

}