import express from "express";
const router = express.Router();
import nodemailer from "nodemailer";

interface ISend {
  email: string;
}

const sendEmail = async ({ email }: ISend) => {
  const transporter = nodemailer.createTransport({
    host: "mail.privateemail.com",
    port: 465, //587
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD_APP,
    },
  });

  transporter.verify(function (error, success) {
    if (error) {
      console.log(error.message);
    } else {
      console.log("Server is ready to take our messages");
    }
  });

  const options = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Testing ",
    html: `
    <h3> Hello from nodemail </h3>
    <p> Test from node coding </p>
    <p> Regard Janken </p>
    `,
  };

  transporter.sendMail(options, (err, info) => {
    if (err) {
      console.log(err.message);
    } else {
      console.log(info.response || info.rejected);
      transporter.close();
    }
  });
};

router.post("/", async (req, res) => {
  try {
    const email = req.body.email;
    await sendEmail({ email });
    res.status(200).send(res.statusMessage);
  } catch (error) {
    res.status(500).send("Server error!");
  }
});

export default router;
