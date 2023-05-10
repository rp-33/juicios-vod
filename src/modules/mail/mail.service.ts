import { 
    Injectable,
    HttpException
} from '@nestjs/common';
import * as SendGrid from '@sendgrid/mail';

@Injectable()
export class MailService {
    constructor() {
        SendGrid.setApiKey(process.env.SENDGRID_KEY);
    }

    async sendEmailPassword(subject : string,to : string,token : string) : Promise<any> {
        try {
            const data : SendGrid.MailDataRequired = {
                to: to,
                subject: subject,
                from: 'rp352429@gmail.com',
                html: 
                `
                    <h1>Recuperar clave.</h1>
                    <a href = https://juiciosvod.com/${token}>Recuperar clave</a>
                `
            };
            return await SendGrid.send(data);
        }
        catch (err) {
            throw new HttpException('Error al enviar el correo', 500)
        }
    }

    async sendEmailStatusInvitation(subject : string,to : string) : Promise<any> {
        try {
            const data : SendGrid.MailDataRequired = {
                to: to,
                subject: subject,
                from: 'rp352429@gmail.com',
                html: 
                `
                    <h1>Bienvenido ya es miembro de juicios vod.</h1>
                    <a href = https://juiciosvod.com/>Entrar</a>
                `
            };
            return await SendGrid.send(data);
        }
        catch (err) {
            throw new HttpException('Error al enviar el correo', 500)
        }
    }

}
