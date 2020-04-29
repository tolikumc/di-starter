import nodemailer from 'nodemailer/lib/nodemailer.js';

export const sendMail = (email: string, code: string) => {
  const transport = nodemailer.createTransport({
    host: 'email-smtp.eu-west-1.amazonaws.com',
    secureConnection: true,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD
    }
  });

  const mailOptions = {
    from: `Test from <${process.env.SMTP_EMAIL}>`,
    to: `${email}`,
    subject: 'User verification',
    html: `<b>${code}</b>`
  };

  return new Promise((resolve, reject) => {
    transport.sendMail(mailOptions, function(error) {
      if (error) {
        console.error(error);
        reject(error);
      } else {
        resolve('Message sent');
      }
    });
  });
};
