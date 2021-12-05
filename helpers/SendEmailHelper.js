const nodemailer = require("nodemailer");

const enviarCorreo = (para, asunto, msj) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: '587',
    secure: false,
    auth: {
      user: "fmwpnowiyubo336t@ethereal.email",
      pass: "KnX6GxzuNAUUykuUc8",
    },
  });

    const mailOptions = {
        from: "Sacris",
        to: para,
        subject: asunto,
        html: msj,
    };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("enviado con exito");
    }
  });
};

module.exports = { enviarCorreo };
