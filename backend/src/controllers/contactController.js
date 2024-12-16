const Contact = require("../models/Contact");
const { sendEmail } = require("../utils/email");

exports.createContact = async (req, res) => {
  try {
    const contact = await Contact.create(req.body);

  //   {
  //   firstname: "",
  //   lastname: "",
  //   email: "",
  //   contactNumber: "",
  //   city: "",
  //   state: "",
  //   country: "",
  //   message: "",
  // }

    // Send email to admin
    
    res.status(201).json({ success: true, data: contact });
    await sendEmail(
      process.env.ADMIN_EMAIL,
      "New Contact Inquiry",
      `
      <p> New Inquiry from ${contact.firstname} ${contact.lastname} </p> \n
      <p> Email: ${contact.email} </p> \n
      <p> Contact Number: ${contact.contactNumber} </p> \n
      <p> City: ${contact.city} </p> \n
      <p> State: ${contact.state} </p> \n
      <p> Country: ${contact.country} </p> \n
      <p> He/She is Saying  </p> \n 
      <blockquote>${contact.message}</blockquote>
      `
    ).catch((err) => {
      console.log("Email not sent to admin.", err);
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
