const Contact = require("../models/Contact");
const { sendEmail } = require("../utils/email");

exports.createContact = async (req, res) => {
  try {
    const contact = await Contact.create(req.body);

    // Send email to admin
    
    res.status(201).json({ success: true, data: contact });
    await sendEmail(
      process.env.ADMIN_EMAIL,
      "New Contact Inquiry",
      `New inquiry from ${contact.firstname} ${contact.lastname}
      He/She is Saying "${contact.message}"
      `

    ).catch(err => {
      console.log("Email not sent to admin.",err);
    });

    // Send email to user
    await sendEmail(
      contact.email,
      "Thank you for contacting us",
      "We have received your inquiry and will get back to you soon."
    ).catch(err => {
      console.log("Email not sent to admin.",err);
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: contacts });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
