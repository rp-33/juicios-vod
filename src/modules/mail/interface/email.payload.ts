interface EmailOptions {
    from: string;
    to: string | string[];
    subject: string;
    text?: string;
    html?: string;
    template?: string;
    attachment?: any;
    cc?: string | string[];
    bcc?: string | string[];
    'o:testmode'?: 'yes' | 'no';
    'h:X-Mailgun-Variables'?: string;
  }