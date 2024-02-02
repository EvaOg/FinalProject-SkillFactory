import React, { useState, useContext } from "react";
import axios from "axios";
import UserContext from "../UserContext";
import AuthorisationBanner from "../forUsers/AuthorisationBanner";

function PopupLogin({ closeWindow, openSignUp, isLogInVisible }) {
  const [isAuthorisationBanner, setAuthorisationBanner] =
    useState(isLogInVisible);
  const { setUserHandler } = useContext(UserContext);

  console.log(isLogInVisible);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    let clientEmail = formData.email;
    let clientPassword = formData.password;

    axios
      .post("https://sf-final-project-be.herokuapp.com/api/auth/sign_in", {
        email: clientEmail,
        password: clientPassword,
      })
      .then((response) => {
        console.log(response);
        setUserHandler(response.data.data.user, response.data.data.token);
        closeWindow();
      })
      .catch((err) => {
        console.log(err);
        alert("Email or password is incorrect. Try again");
      });
  };

  function autoFill() {
    setAuthorisationBanner(!isAuthorisationBanner);

    axios
      .post("https://sf-final-project-be.herokuapp.com/api/auth/sign_in", {
        email: "jack@black.com",
        password: "123456",
      })
      .then((response) => {
        console.log(response);
        setUserHandler(response.data.data.user, response.data.data.token);
        closeWindow();
      })
      .catch((err) => {
        console.log(err);
        alert("Email or password is incorrect. Try again");
      });
  }

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

        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label for="login-email">Email address</label>

            <input
              required
              type="email"
              className="form-control"
              id="login-email"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              onChange={(event) =>
                setFormData({ ...formData, email: event.target.value })
              }
            />
          </div>

          <div className="form-group">
            <label for="login-password">Password</label>
            <input
              required
              type="password"
              className="form-control"
              id="login-password"
              placeholder="Password"
              onChange={(event) =>
                setFormData({ ...formData, password: event.target.value })
              }
            />
          </div>
          <button type="submit" className="btn btn-primary form-card-btn">
            Submit
          </button>
          <button
            type="submit"
            className="register-btn"
            onClick={() => openSignUp()}
          >
            Register
          </button>
        </form>
      </div>
      {isAuthorisationBanner ? (
        <AuthorisationBanner
          autoFill={() => autoFill()}
          closeWindow={() => {
            setAuthorisationBanner(!isAuthorisationBanner);
          }}
        />
      ) : (
        ""
      )}
    </div>
  );
}
export default PopupLogin;
