import { SlClose } from "react-icons/sl";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import UserContext from "../UserContext";

function OfficerDetails() {
  const { token } = useContext(UserContext);
  const userID = useLocation().state;

  const [officer, setOfficer] = useState("");
  // const [userData, setUserData] = useState(currentUser);

  useEffect(() => {
    axios
      .get(`https://sf-final-project-be.herokuapp.com/api/officers/${userID}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res);
        setOfficer(res.data.data);
      });
  }, []); // <-- empty dependencies to run only on mount

  function onFocusOutDescriptionHandler() {
    console.log(officer);

    let clientEmail = officer.email;
    let fName = officer.firstName;
    let lName = officer.lastName;

    axios
      .put(
        `https://sf-final-project-be.herokuapp.com/api/officers/${officer._id}`,
        {
          firstName: fName,
          lastName: lName,
          email: clientEmail,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      )
      .then((response) => {
        console.log(token);
        console.log(`User ${officer._id} changed`);
      })
      .catch((error) => {
        console.log(officer);
        console.log(error.message);
      });
  }

  const navigate = useNavigate();
  return (
    <>
      <SlClose
        className="close-icon"
        onClick={() => {
          navigate("/allofficers");
        }}
      />

      <table className="table-report-details">
        <tr>
          <th>First name</th>
          <td>
            <input
              className="description-input"
              type="text"
              onChange={(e) =>
                setOfficer({ ...officer, firstName: e.target.value })
              }
              onBlur={() => onFocusOutDescriptionHandler()}
              placeholder={officer.firstName}
            />
          </td>
        </tr>
        <tr>
          <th>Last name</th>
          <td>
            <input
              className="description-input"
              type="text"
              placeholder={officer.lastName}
              onChange={(e) =>
                setOfficer({ ...officer, lastName: e.target.value })
              }
              onBlur={() => onFocusOutDescriptionHandler()}
            />
          </td>
        </tr>
        <tr>
          <th>Email</th>
          <td>
            <input
              className="description-input"
              type="email"
              placeholder={officer.email}
              onChange={(e) =>
                setOfficer({ ...officer, email: e.target.value })
              }
              onBlur={() => onFocusOutDescriptionHandler()}
            />
          </td>
        </tr>
      </table>
    </>
  );
}

export default OfficerDetails;
