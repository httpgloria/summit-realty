import React, { useContext, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "./contactPage.scss";
import apiRequest from "../../lib/apiRequest";
import { AuthContext } from "../../context/AuthContext";

function ContactPage() {
  const { currentUser } = useContext(AuthContext);
  const [success, setSuccess] = useState(false);
  const formRef = useRef(null);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      console.log("form submited");
      const formData = new FormData(e.target);
      const inputData = Object.fromEntries(formData);
      const res = await apiRequest.post("/inquiries", {
        firstName: inputData.firstName,
        lastName: inputData.lastName,
        username: currentUser.username,
        subject: inputData.subject,
        message: inputData.message,
      });
      console.log(res);
      setSuccess(true);
    } catch (error) {
      console.log(error);
    } finally {
      formRef.current.reset();
    }
  };

  return (
    <div className="formContainer">
      <h1>Send Us A Message</h1>
      <p>Let us know what we can help with.</p>
      <div className="wrapper">
        <form onSubmit={handleSubmit} ref={formRef}>
          <div className="item">
            <label htmlFor="firstName">First Name</label>
            <input id="firstName" name="firstName" type="text" />
          </div>
          <div className="item">
            <label htmlFor="lastName">Last Name</label>
            <input id="lastName" name="lastName" type="text" />
          </div>
          <div className="item">
            <label htmlFor="subject">Subject</label>
            <input id="subject" name="subject" type="text" />
          </div>
          <div className="item description">
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" rows="10"></textarea>
          </div>
          <button className="sendButton">Send</button>
        </form>
        {success && "Message sent successfully!"}
      </div>
    </div>
  );
}

export default ContactPage;
