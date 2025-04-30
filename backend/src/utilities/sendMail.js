import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.USER_PASSWORD,
  },
});

const sendMail = async (receiverEmail, subject, message) => {
  try {
    const response = await transporter.sendMail({
      from: process.env.USER_EMAIL,
      to: receiverEmail,
      subject: subject,
      text: message,
    });
    return response;
  } catch (error) {
    //console.log(error);
    return null;
  }
};

export default sendMail;
