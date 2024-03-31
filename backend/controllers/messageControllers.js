const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

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

    res.status(201).json({ message: "Booking received successfully", booking });
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

    res.status(201).json({ message: "Message received successfully", inquiry });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { receiveBooking, receiveMessage };
