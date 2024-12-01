import React, { useEffect, useState } from "react";

export default function AdminContact() {
  const [contactList, setContactList] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    // Mock Data
    const mockData = [
      {
        _id: "67482915e90a1a7560b4934a",
        firstname: "Ultra",
        lastname: "Factechz",
        email: "rautan_1@rknec.edu",
        contactNumber: "08408820931",
        city: "Nagpur",
        state: "Maharashtra",
        country: "India",
        message: "Its my message",
        createdAt: "2024-11-28T08:25:57.396Z",
      },
      {
        _id: "67482a8e0af1644648523493",
        firstname: "Ultra",
        lastname: "Factechz",
        email: "rautan_1@rknec.edu",
        contactNumber: "08408820931",
        city: "Nagpur",
        state: "Maharashtra",
        country: "India",
        message: "nkfbjksbc,z",
        createdAt: "2024-11-28T08:32:14.538Z",
      },
    ];

    setContactList(mockData);
  }, []);

  const handleViewMore = (contact) => {
    setSelectedContact(contact);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setSelectedContact(null);
  };

  return (
    <div className="AdminContact">
      <table className="contactTable">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Contact Number</th>
            <th>City</th>
            <th>State</th>
            <th>Country</th>
            <th>Created At</th>
            <th>Action</th>
          </tr> 
        </thead>
        <tbody>
          {contactList.map((contact) => (
            <tr key={contact._id}>
              <td>{contact.firstname}</td>
              <td>{contact.lastname}</td>
              <td>{contact.email}</td>
              <td>{contact.contactNumber}</td>
              <td>{contact.city}</td>
              <td>{contact.state}</td>
              <td>{contact.country}</td>
              <td>{new Date(contact.createdAt).toLocaleString()}</td>
              <td>
                <button
                  className="view-btn"
                  onClick={() => handleViewMore(contact)}
                >
                  View More
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isDialogOpen && (
        <div className="dialogOverlay">
          <div className="dialogBox">
            <h2>Contact Details</h2>
            {selectedContact && (
              <div>
                <p>
                  <strong>First Name:</strong> {selectedContact.firstname}
                </p>
                <p>
                  <strong>Last Name:</strong> {selectedContact.lastname}
                </p>
                <p>
                  <strong>Email:</strong> {selectedContact.email}
                </p>
                <p>
                  <strong>Contact Number:</strong>{" "}
                  {selectedContact.contactNumber}
                </p>
                <p>
                  <strong>City:</strong> {selectedContact.city}
                </p>
                <p>
                  <strong>State:</strong> {selectedContact.state}
                </p>
                <p>
                  <strong>Country:</strong> {selectedContact.country}
                </p>
                <p>
                  <strong>Message:</strong> {selectedContact.message}
                </p>
                <p>
                  <strong>Created At:</strong>{" "}
                  {new Date(selectedContact.createdAt).toLocaleString()}
                </p>
              </div>
            )}
            <button className="view-btn" onClick={closeDialog}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
