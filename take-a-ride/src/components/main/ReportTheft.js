import { useState, useContext } from "react";
import Form from "react-bootstrap/Form";
import axios from "axios";
import InputGroup from "react-bootstrap/InputGroup";
import MessageSentBanner from "../forUsers/MessageSentBanner";
import UserContext from "../UserContext";

function ReportTheft({ closeWindow }) {
  const { isAuth, token } = useContext(UserContext);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    ownerFullName: "",
    licenseNumber: "",
    email: "",
    type: "",
    clientId: "",
    date: "",
    comments: "",
  });

  const authHandleSubmit = (e) => {
    e.preventDefault();
    let clientFullName = formData.ownerFullName;
    // let clientlicenseNumber = formData.licenseNumber;
    let clientEmail = formData.email;
    // let bikeType = formData.type;
    let theftDate = formData.date;
    let clientComments = formData.clientComments;

    axios
      .post(
        "https://sf-final-project-be.herokuapp.com/api/cases/",
        {
          licenseNumber: "56y34gwrtgrt",
          ownerFullName: clientFullName,
          type: "sport",
          clientId: "09f9e555-51f0-4f43-af00-76cccd9fc6c3",
          email: clientEmail,
          date: theftDate,
          comments: clientComments,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((result) => {
        console.log(result);
        setSubmitted(!submitted);
      })
      .catch((err) => console.log(err));
  };

  const noAuthHandleSubmit = (e) => {
    e.preventDefault();
    let clientFullName = formData.ownerFullName;
    // let clientlicenseNumber = formData.licenseNumber;
    let clientEmail = formData.email;
    // let bikeType = formData.type;
    let theftDate = formData.date;
    let clientComments = formData.clientComments;

    axios
      .post("https://sf-final-project-be.herokuapp.com/api/public/report", {
        licenseNumber: "56y34gwrtgrt",
        ownerFullName: clientFullName,
        email: clientEmail,
        type: "sport",
        clientId: "09f9e555-51f0-4f43-af00-76cccd9fc6c3",
        date: theftDate,
        comments: clientComments,
      })
      .then((result) => {
        console.log(result);
        setSubmitted(!submitted);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="reportTheft-main-container-img" id="report-theft">
      <div className="repordTheft-background-opassity">
        <h3 id="h3">REPORT THEFT</h3>

        <form
          className="reportTheft-form-container"
          onSubmit={isAuth ? authHandleSubmit : noAuthHandleSubmit}
        >
          <div className="reportTheft-name-form">
            <div className="form-group">
              <label for="ownerFullName">Your full name*</label>
              <input
                required
                type="text"
                className="form-control"
                id="ownerFullName"
                placeholder="Your name"
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    ownerFullName: event.target.value,
                  })
                }
              />
            </div>
            <div className="form-group">
              <label for="licenseNumber">License number</label>
              <input
                type="text"
                className="form-control"
                id="licenseNumber"
                placeholder="License number"
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    licenseNumber: event.target.value,
                  })
                }
              />
            </div>
          </div>

          <div className="reportTheft-name-form">
            <div className="reportTheft-name-form form-group">
              <div className="form-group">
                <label for="type">Choose the bike type*</label>
                <select
                  id="type"
                  className="form-select reportTheft-bike-type"
                  aria-label="Default select example"
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      type: event.target.value,
                    })
                  }
                  required
                >
                  <option value="">Type of bike</option>
                  <option value="Sport">Sport</option>
                  <option value="Modern Adult">Modern Adult</option>
                  <option value="Modern Junior">Modern Junior</option>
                  <option value="Mountain">Mountain</option>
                  <option value="Electric">Electro</option>
                </select>
              </div>

              <div className="form-row">
                <div className="form-group col-md-6">
                  <label for="email">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Email"
                    onChange={(event) =>
                      setFormData({
                        ...formData,
                        email: event.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="reportTheft-name-form">
            <div className="reportTheft-name-form form-group">
              <div className="form-group">
                <label>The date of case:</label>
                <input
                  id="reportTheft-date"
                  className="form-select date"
                  type="date"
                  name="reportTheft-date"
                  min="2023-01-01"
                  max="2023-12-31"
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      date: event.target.value,
                    })
                  }
                />
              </div>
            </div>
            {isAuth ? (
              ""
            ) : (
              <div className="form-group">
                <label for="clientId">Client id*</label>
                <input
                  type="text"
                  className="form-control"
                  id="clientId"
                  placeholder="Your id"
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      clientId: event.target.value,
                    })
                  }
                />
              </div>
            )}
          </div>

          <label for="reportTheft-comments"></label>
          <InputGroup>
            <InputGroup.Text id="reportTheft-comments-name">
              Your comments:
            </InputGroup.Text>
            <Form.Control
              as="textarea"
              aria-label="With textarea"
              id="reportTheft-comments"
              onChange={(event) =>
                setFormData({
                  ...formData,
                  comments: event.target.value,
                })
              }
            />
          </InputGroup>

          <div className="form-group">
            <div className="form-check" id="form-check">
              <input
                required
                className="form-check-input"
                type="checkbox"
                id="reportTheft-gridCheck"
              />

              <p className="check-box-text">I agree with terms & conditions</p>
            </div>
            <button
              type="submit"
              id="reportTheft-btn"
              className="btn btn-primary"
            >
              Submit
            </button>
          </div>
        </form>
      </div>

      {submitted ? (
        <MessageSentBanner
          closeWindow={() => setSubmitted(!submitted)}
          messageText={"Your report has been successfully submitted!"}
        />
      ) : (
        ""
      )}
    </div>
  );
}
export default ReportTheft;
