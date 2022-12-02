module.exports = ({env}) => ({
email: {
    provider: 'nodemailer',
    providerOptions: {
        auth: {
            user: env('SMTP_USER'),
            pass: env('SMTP_PASSWORD')
        },
        host: env('SMTP_HOST', 'smtp.example.com'),
        port: env('SMTP_PORT', 587),
        service: 'gmail'
    },
    settings: {
        defaultFrom: 'no_reply@nccomtech.com',
        defaultReplyTo: 'no_reply@nccomtech.com'
    }
}
});
