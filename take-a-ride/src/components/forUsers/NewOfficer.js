import React, { useState, useContext } from "react";
import axios from "axios";
import MessageSentBanner from "./MessageSentBanner";
import UserContext from "../UserContext";

function NewOfficer({ closeWindow }) {
  const { token } = useContext(UserContext);
  const [submitted, setSubmitted] = useState(false);
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
      .post(
        "https://sf-final-project-be.herokuapp.com/api/officers",
        {
          lastName: clientLName,
          firstName: clientFName,
          email: clientEmail,
          password: clientPassword,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((result) => {
        console.log(result);
        setSubmitted(!submitted);
      })
      .catch((err) => {
        console.log(err);
        alert("Please use other email");
      });
  };

  return (
    <div className="popup-main-container">
      <div className="popup-logIn" id="newOfficer-main-container">
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
              placeholder="Officer's name"
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
              placeholder="Officer's surname"
              onChange={(event) =>
                setFormData({ ...formData, lastName: event.target.value })
              }
            />
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label for="signup-email">Email*</label>

              <input
                required
                type="email"
                className="form-control"
                id="signup-email"
                placeholder="Officer's email"
                onChange={(event) =>
                  setFormData({ ...formData, email: event.target.value })
                }
              />
            </div>
            <div className="form-group col-md-6">
              <label for="signup-password">Password*</label>

              <input
                required
                type="password"
                className="form-control"
                id="signup-password"
                placeholder="Password"
                minLength="6"
                onChange={(event) =>
                  setFormData({ ...formData, password: event.target.value })
                }
              />
            </div>
          </div>

          <div className="form-group">
            <button
              type="submit"
              id="form-card-btn"
              className="btn btn-primary form-card-btn"
            >
              Register new officer
            </button>
          </div>
        </form>
      </div>
      {submitted ? (
        <MessageSentBanner
          closeWindow={() => {
            setSubmitted(!submitted);
            closeWindow();
          }}
          messageText={"New officer has been successfully registered!"}
        />
      ) : (
        ""
      )}
    </div>
  );
}
export default NewOfficer;
