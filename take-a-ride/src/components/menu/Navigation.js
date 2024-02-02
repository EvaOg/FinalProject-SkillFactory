import { Nav, Navbar, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { HashLink as Link } from "react-router-hash-link";
import Logo from "./Logo";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../UserContext";
import PopupLogin from "../forUsers/PopupLogin";
import PopupSignup from "../forUsers/PopupSignup";
import NewOfficer from "../forUsers/NewOfficer";

function Navigation() {
  const { isAuth, setUserHandler } = useContext(UserContext);
  const [isLogInVisible, setLogInVisible] = useState(false);
  const [isSignUpVisible, setSignUpVisible] = useState(false);
  const [isNewOfficerVisible, setIsNewOfficerVisible] = useState(false);

  const nav = useNavigate();
  return (
    <>
      <div className="nav-main-container">
        <Navbar className="nav-box" id="nav-box">
          <Container id="nav-container-big">
            <Nav className="navbar" id="navbar">
              <Link className="nav-link" to="/#report-theft">
                Report theft
              </Link>
              {isAuth ? (
                <NavLink
                  className="nav-link"
                  to="/allreports"
                  onClick={() => console.log(isAuth)}
                >
                  All reports
                </NavLink>
              ) : (
                <Link className="nav-link" to="/#how-it-works">
                  How it works
                </Link>
              )}
              {isAuth ? (
                <NavLink className="nav-link" to="/allofficers">
                  All Officers
                </NavLink>
              ) : (
                " "
              )}

              <NavLink className="nav-link" to="/" id="navlink-logo">
                <Logo to="/" />
              </NavLink>

              {isAuth ? (
                <div className="nav-link nav-name-txt nav-collaps">
                  {isAuth.firstName
                    ? `Hi, ${isAuth.firstName}!`
                    : "Hi, Officer!"}
                </div>
              ) : (
                <NavLink
                  className="nav-link"
                  onClick={() => setLogInVisible(!isLogInVisible)}
                >
                  Login
                </NavLink>
              )}

              {isAuth ? (
                <NavLink
                  className="nav-link"
                  onClick={() => setIsNewOfficerVisible(!isNewOfficerVisible)}
                >
                  New officer
                </NavLink>
              ) : (
                ""
              )}
              {isAuth ? (
                <button
                  className="logout-btn"
                  onClick={() => {
                    setUserHandler("");
                    nav("/");
                  }}
                >
                  {" "}
                  Logout{" "}
                </button>
              ) : (
                <NavLink
                  className="nav-link"
                  onClick={() => setSignUpVisible(!isSignUpVisible)}
                >
                  Sign up
                </NavLink>
              )}
            </Nav>
          </Container>
        </Navbar>
      </div>

      <div className="nav-main-container-small">
        <Navbar id="nav-main-inner-small" data-bs-theme="dark" expand="lg">
          <Container>
            <NavLink className="nav-link" to="/" id="navlink-logo">
              <Logo to="/" />
            </NavLink>

            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                {isAuth ? (
                  <div className="nav-name-txt nav-collaps" id="nav-name-txt">
                    {isAuth.firstName
                      ? `Hi, ${isAuth.firstName}!`
                      : "Hi, Officer!"}
                  </div>
                ) : (
                  <NavLink
                    className="nav-link nav-collaps"
                    onClick={() => setLogInVisible(!isLogInVisible)}
                  >
                    Login
                  </NavLink>
                )}
                {isAuth ? (
                  <button
                    className="logout-btn nav-collaps"
                    id="logout-btn"
                    onClick={() => {
                      setUserHandler("");
                      nav("/");
                    }}
                  >
                    {" "}
                    Logout{" "}
                  </button>
                ) : (
                  <NavLink
                    className="nav-link nav-collaps"
                    onClick={() => setSignUpVisible(!isSignUpVisible)}
                  >
                    Sign up
                  </NavLink>
                )}
                {isAuth ? (
                  <NavLink
                    className="nav-link nav-collaps"
                    onClick={() => setIsNewOfficerVisible(!isNewOfficerVisible)}
                  >
                    New officer
                  </NavLink>
                ) : (
                  ""
                )}
                <Link className="nav-link nav-collaps" to="/#report-theft">
                  Report theft
                </Link>
                {isAuth ? (
                  <NavLink className="nav-link nav-collaps" to="/allreports">
                    All reports
                  </NavLink>
                ) : (
                  <Link className="nav-link nav-collaps" to="/#how-it-works">
                    How it works
                  </Link>
                )}
                {isAuth ? (
                  <NavLink className="nav-link nav-collaps" to="/allofficers">
                    All Officers
                  </NavLink>
                ) : (
                  " "
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>

      {isLogInVisible ? (
        <PopupLogin
          isAuthoFill
          isLogInVisible
          openSignUp={() => {
            setLogInVisible(!isLogInVisible);
            setSignUpVisible(!isSignUpVisible);
          }}
          closeWindow={() => setLogInVisible(!isLogInVisible)}
        />
      ) : (
        ""
      )}

      {isSignUpVisible ? (
        <PopupSignup
          LogInVisibleHandle={() => setLogInVisible(!isLogInVisible)}
          closeWindow={() => {
            setSignUpVisible(!isSignUpVisible);
          }}
        />
      ) : (
        ""
      )}

      {isNewOfficerVisible ? (
        <NewOfficer
          closeWindow={() => setIsNewOfficerVisible(!isNewOfficerVisible)}
        />
      ) : (
        ""
      )}
    </>
  );
}

export default Navigation;
