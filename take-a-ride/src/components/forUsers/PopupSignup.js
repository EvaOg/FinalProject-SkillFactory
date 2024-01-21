import React, { useState } from "react";
import axios from "axios";

function PopupSignup({ closeWindow, LogInVisibleHandle }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    let clientFName = formData.firstName;
    let clientLName = formData.lastName;
    let clientEmail = formData.email;
    let clientPassword = formData.password;

    axios
      .post("https://sf-final-project-be.herokuapp.com/api/auth/sign_up", {
        email: clientEmail,
        lastName: clientLName,
        firstName: clientFName,
        password: clientPassword,
        clientId: "09f9e555-51f0-4f43-af00-76cccd9fc6c3",
      })
      .then((result) => {
        console.log(result);
        closeWindow();
        LogInVisibleHandle();
      })
      .catch((err) => {
        console.log(err);
        alert("Registration is unsucessful. Please, try with other email");
        return;
      });
  };

  return (
    <div className="popup-main-container">
      <div className="popup-logIn">
        <svg
          className="bi bi-x popup-close-icon"
          viewBox="0 0 16 16"
          onClick={() => closeWindow()}
        >
          <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
        </svg>

        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label for="signup-name">Name</label>

            <input
              type="text"
              name="fname"
              className="form-control"
              id="signup-name"
              placeholder="Your name"
              onChange={(event) =>
                setFormData({ ...formData, firstName: event.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label for="signup-surname">Surname</label>

            <input
              type="text"
              name="lname"
              className="form-control"
              id="signup-surname"
              placeholder="Your surname"
              onChange={(event) =>
                setFormData({ ...formData, lastName: event.target.value })
              }
            />
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label for="signup-email">Email</label>

              <input
                required
                type="email"
                className="form-control"
                id="signup-email"
                placeholder="Email"
                onChange={(event) =>
                  setFormData({ ...formData, email: event.target.value })
                }
              />
            </div>
            <div className="form-group col-md-6">
              <label for="signup-password">Password</label>

              <input
                required
                type="password"
                className="form-control"
                id="signup-password"
                placeholder="Password"
                minLength="5"
                onChange={(event) =>
                  setFormData({ ...formData, password: event.target.value })
                }
              />
            </div>
          </div>

          <div className="form-group">
            <div className="form-check">
              <input
                required
                className="form-check-input"
                type="checkbox"
                id="gridCheck"
              />

              <p className="check-box-text">I agree with terms & conditions</p>
            </div>
            <button
              type="submit"
              id="form-card-btn"
              className="btn btn-primary form-card-btn"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default PopupSignup;
