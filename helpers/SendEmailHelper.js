const nodemailer = require("nodemailer");

const enviarCorreo = (para, asunto, msj) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: '2525',
    auth: {
      user: "07bf50c103a1df",
      pass: "ca2217632cf570",
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
