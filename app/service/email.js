'use strict';

const Service = require('egg').Service;

const nodemailer = require('nodemailer');

class EmailService extends Service {
  async sendEmail(params) {
    const transport = nodemailer.createTransport({
      host: this.config.email.host,
      port: 465,
      secure: true,
      auth: {
        user: this.config.email.name,
        pass: this.config.email.password,
      },
    });
    const code = String(Math.floor(Math.random() * 1000000)).padEnd(6, '0');
    const message = {
      from: this.config.email.name,
      to: params.userEmail,
      subject: '验证码',
      html: `<p>您好！</p>
             <p>您的验证码是：<strong style="color:orangered;">${code}</strong></p>
             <p>如果不是您本人操作，请无视此邮件</p>`,
    };
    transport.sendMail(message, err => {
      if (err) {
        console.log(code, 1);
        return false;
      }
      return code;

    });
  }
}

module.exports = EmailService;
