const nodemailer = require("nodemailer");

const enviarCorreo = (para, asunto, msj) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "sacris2021@gmail.com",
      pass: "07032004E",
    },
  });

    const mailOptions = {
        from: "sacris2021@gmail.com",
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
