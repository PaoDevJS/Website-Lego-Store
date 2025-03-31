import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.email,
      pass: process.env.pass,
    },
});

const isSendMail = async ({ gmail, subject, html }) => {
  return await transporter.sendMail({
    from: `LEGOWORLD STORE <${process.env.email}>`,
    to: `${gmail}`,
    subject: subject,
    html: html, 
  });
}

export default isSendMail