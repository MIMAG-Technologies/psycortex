import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";

function Booking() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  const [isButtonDisabled, setisButtonDisabled] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contactNumber: "",
    city: "",
    state: "",
    country: "",
    problemType: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { id, checked } = e.target;
    if (checked) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        problemType:
          prevFormData.problemType +
          (prevFormData.problemType ? ", " : "") +
          id,
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        problemType: prevFormData.problemType
          .split(", ")
          .filter((type) => type !== id)
          .join(", "),
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if any field is empty
    if (Object.values(formData).some((value) => value === "")) {
      window.alert("Please fill in all fields before submitting.");
      return;
    }

    try {
      // Check if local storage contains submission time
      const lastSubmitTime = localStorage.getItem("lastSubmitTime");
      if (lastSubmitTime) {
        const currentTime = new Date().getTime();
        const timeDifference =
          (currentTime - parseInt(lastSubmitTime)) / (1000 * 60 * 60); // Difference in hours
        if (timeDifference < 1) {
          setmessage(
            "You recently submitted a booking. Please try again after sometime!"
          );
          setismessageVisible(true);
          return;
        }
      }
      setisButtonDisabled(true);

      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/messages/booking`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (response.ok) {
        console.log("Booking submitted successfully");
        // Store current time in local storage
        localStorage.setItem("lastSubmitTime", new Date().getTime().toString());
        setmessage(
          "Your Booking Done Succesfully , We wil Contact you Soon , Thank You for Choosing Psycortex Pvt. Ltd!"
        );
        setismessageVisible(true);
        setisButtonDisabled(false);
      } else {
        console.error("Failed to submit booking");
        setmessage("Failed to book appointment! Try Again Later");
        setismessageVisible(true);
        setisButtonDisabled(false);
      }
    } catch (error) {
      console.error("Error submitting booking:", error);
    }
  };

  const [message, setmessage] = useState("");
  const [ismessageVisible, setismessageVisible] = useState(false);

  return (
    <>
      <Helmet>
        <title>Book an Appointment at Psycortex</title>
        <meta
          name="description"
          content="Schedule your appointment with Psycortex. Access expert mental health services tailored to your needs by booking online today."
        />
      </Helmet>
      {ismessageVisible ? (
        <div id="messageBox">
          <div>
            <span
              onClick={() => {
                setismessageVisible(false);
              }}
            >
              x
            </span>
            {message}
          </div>
        </div>
      ) : (
        <></>
      )}
      <div id="Enquiry">
        <h1>Book Appointment Now</h1>
        <form className="form">
          <div>
            <label htmlFor="">Name</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="">Email</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="">Phone Number</label>
            <input
              type="number"
              name="contactNumber"
              required
              value={formData.contactNumber}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="">City:</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="">State:</label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="">Country:</label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
            />
          </div>
          <div id="message">
            <label>Problem Type:</label>
            <div>
              <span>
                <input
                  type="checkbox"
                  name="problemType"
                  id="anxiety_disorders"
                  onChange={handleCheckboxChange}
                />
                <label htmlFor="anxiety_disorders">Anxiety Disorders</label>
              </span>
              <span>
                <input
                  type="checkbox"
                  name="problemType"
                  id="mood_disorders"
                  onChange={handleCheckboxChange}
                />
                <label htmlFor="mood_disorders">Mood Disorders</label>
              </span>
              <span>
                <input
                  type="checkbox"
                  name="enquirytype"
                  id="psychotic_disorders"
                  onChange={handleCheckboxChange}
                />
                <label htmlFor="psychotic_disorders">Psychotic Disorders</label>
              </span>
              <span>
                <input
                  type="checkbox"
                  name="enquirytype"
                  id="trauma_related_disorders"
                  onChange={handleCheckboxChange}
                />
                <label htmlFor="trauma_related_disorders">
                  Trauma-Related Disorders
                </label>
              </span>
              <span>
                <input
                  type="checkbox"
                  name="enquirytype"
                  id="eating_disorders"
                  onChange={handleCheckboxChange}
                />
                <label htmlFor="eating_disorders">Eating Disorders</label>
              </span>
              <span>
                <input
                  type="checkbox"
                  name="enquirytype"
                  id="substance_use_disorders"
                  onChange={handleCheckboxChange}
                />
                <label htmlFor="substance_use_disorders">
                  Substance Use Disorders
                </label>
              </span>
              <span>
                <input
                  type="checkbox"
                  name="enquirytype"
                  id="others"
                  onChange={handleCheckboxChange}
                />
                <label htmlFor="others">Other</label>
              </span>
            </div>
            <label htmlFor="discription">
              Brief Description of your Problem:
            </label>
            <textarea
              name="description"
              cols="30"
              rows="10"
              id="discription"
              value={formData.description}
              onChange={handleChange}
            ></textarea>
          </div>
          <button
            disabled={isButtonDisabled}
            style={{
              cursor: isButtonDisabled ? "not-allowed" : "pointer",
            }}
            onClick={handleSubmit}
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default Booking;
