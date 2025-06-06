const nodemailer = require('nodemailer');

class MailService{
    constructor(){
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.SMTP_USER, // generated ethereal user
                pass: process.env.SMTP_PASSWORD // generated ethereal password
            }
        })
    }
    async sendMail(email, activationLink){
        await this.transporter.sendMail({
            from : process.env.SMTP_USER, // sender address
            to: email, // list of receivers
            subject: `Account activation link:  ${activationLink}`,
             html:`
             <div>
             <a href="${activationLink}">Activate your account</a>
             </div>
             `
        })
    }
}

module.exports = new MailService()