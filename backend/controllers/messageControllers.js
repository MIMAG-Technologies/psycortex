const nodemailer = require("nodemailer");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const senderMail = process.env.SENDER_EMAIL;
const receiverMail = process.env.RECEIVER_EMAIL;

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: senderMail,
    pass: process.env.EMAIL_PASS,
  },
});

const receiveBooking = async (req, res) => {
  try {
    const {
      name,
      contactNumber,
      email,
      city,
      state,
      country,
      problemType,
      description,
    } = req.body;

    const booking = await prisma.booking.create({
      data: {
        name,
        contactNumber,
        email,
        city,
        state,
        country,
        problemType,
        description,
      },
    });
    var mail = {
      from: senderMail,
      to: receiverMail,
      subject: `New Appointment Booking from ${name}`,
      html: `<p>You have received a new appointment booking:</p>
            <p>Name: ${name}<br>
            Email: ${email}<br>
            Phone Number: ${contactNumber}<br>
            City: ${city}<br>
            State: ${state}<br>
            Country: ${country}<br>
            Problem Type: ${problemType}<br>
            Brief Description of Problem: ${description}</p>
            <p>Best regards</p>`,
    };

    transporter.sendMail(mail, function (error, info) {
      if (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
      } else {
        console.log("Email sent: " + info.response);
        res
          .status(201)
          .json({ message: "Booking received successfully", booking });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const receiveMessage = async (req, res) => {
  try {
    const {
      country,
      state,
      city,
      firstname,
      lastname,
      contactNumber,
      email,
      message,
    } = req.body;

    const inquiry = await prisma.inquiry.create({
      data: {
        country,
        state,
        city,
        firstname,
        lastname,
        contactNumber,
        email,
        message,
      },
    });

    var mail = {
      from: senderMail,
      to: receiverMail,
      subject: `New Query from ${firstname + " " + lastname}`,
      html: `<p>${firstname + " " + lastname} Wants to Ask Someting:</p>
            <p>Here are my Details<br>
            Email: ${email}<br>
            Phone Number: ${contactNumber}<br>
            City: ${city}<br>
            State: ${state}<br>
            Country: ${country}<br>
            Message:${message}
            </p>
            <p>Best regards</p>
        
            `,
    };

    transporter.sendMail(mail, function (error, info) {
      if (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
      } else {
        console.log("Email sent: " + info.response);
        res
          .status(201)
          .json({ message: "Message received successfully", inquiry });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { receiveBooking, receiveMessage };
