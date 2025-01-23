
export interface Email {
    to: string;
    from: string;
    subject: string;
    html: string;
}

export interface EmailAuth {
    user: string;
    pass: string;
}

export interface EmailConfig {
    host: string;
    port: string;
    auth: EmailAuth;
}

export interface EmailOptions {
    email: string;
    subject: string;
    html: string;
    senderName?: string;
}
