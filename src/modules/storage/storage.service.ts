import { 
    Injectable,
    HttpException,
} from '@nestjs/common';
import * as AWS from "aws-sdk";
import { fileDto } from './dto/storage.dto';

@Injectable()
export class StorageService {

    s3 = new AWS.S3
    ({
        accessKeyId: process.env.AWS_S3_ACCESS_KEY,
        secretAccessKey: process.env.AWS_S3_KEY_SECRET,
    });

    async uploadFile(file : fileDto){
        try {
            
            const { originalname,buffer } = file;
            await this.s3_upload(buffer, originalname);
            return `${process.env.CLOUDFRONT}/${originalname}`;
            
        }
        catch (err) {
            throw new HttpException('Error al subir archivo', 500)
        }
        
    }

    async s3_upload(file : Buffer,name : string) {
        try {
            const params = 
            {
                Bucket:  process.env.AWS_S3_BUCKET,
                Key: String(name),
                Body: file
            };
            return await this.s3.upload(params).promise();
        }
        catch (err) {
            throw new HttpException('Error al subir archivo', 500)
        }
    }

    async downloaddFile(file : string,res : any) : Promise<Buffer> {
        try {
            const params = 
            {
                Bucket: process.env.AWS_S3_BUCKET,
                Key: process.env.AWS_S3_ACCESS_KEY
            };
            res.attachment(file);
            const fileStream = this.s3.getObject(params).createReadStream();
            return await fileStream.pipe(res);
           
        }
        catch (err) {
            throw new HttpException('Error al descargar archivo', 500)
        }
    }
}
