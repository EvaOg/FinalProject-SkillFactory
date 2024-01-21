import { SlClose } from "react-icons/sl";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import UserContext from "../UserContext";

function ReportDetails() {
  const { token } = useContext(UserContext);
  const currentReportID = useLocation().state;
  const [reportData, setReportData] = useState("");

  useEffect(() => {
    axios
      .get(
        `https://sf-final-project-be.herokuapp.com/api/cases/${currentReportID}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      )
      .then((res) => {
        console.log(res);
        setReportData(res.data.data);
      });
  }, []);

  function onFocusOutDescriptionHandler() {
    let clientFullName = reportData.ownerFullName;
    let clientlicenseNumber = reportData.licenseNumber;
    let clientEmail = reportData.email;
    let bikeType = reportData.type;
    let theftDate = reportData.date;
    let clientComments = reportData.clientComments;

    axios
      .put(
        `https://sf-final-project-be.herokuapp.com/api/cases/${reportData._id}`,
        {
          licenseNumber: clientlicenseNumber,
          ownerFullName: clientFullName,
          type: bikeType,
          email: clientEmail,
          date: theftDate,
          comments: clientComments,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      )
      .then((response) =>
        alert(`The data of the report (id ${reportData._id}) was changed`),
      )
      .catch((error) => console.log(error.message));
  }

  const navigate = useNavigate();
  return (
    <>
      <SlClose
        className="close-icon"
        onClick={() => {
          navigate("/allreports");
        }}
      />

      <table className="table-report-details">
        <tr>
          <th>License Nr.</th>
          <td>
            <input
              className="description-input"
              type="text"
              placeholder={reportData.licenseNumber}
              onChange={(e) =>
                setReportData({ ...reportData, licenseNumber: e.target.value })
              }
              onBlur={() => onFocusOutDescriptionHandler()}
            />
          </td>
        </tr>
        <tr>
          <th>Name</th>
          <td>
            <input
              className="description-input"
              type="text"
              placeholder={reportData.ownerFullName}
              onChange={(e) =>
                setReportData({ ...reportData, ownerFullName: e.target.value })
              }
              onBlur={() => onFocusOutDescriptionHandler()}
            />
          </td>
        </tr>
        <tr>
          <th>Bike type</th>
          <td>
            <input
              className="description-input"
              type="text"
              placeholder={reportData.type}
              onChange={(e) =>
                setReportData({ ...reportData, type: e.target.value })
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
              type="text"
              placeholder={reportData.email}
              onChange={(e) =>
                setReportData({ ...reportData, email: e.target.value })
              }
              onBlur={() => onFocusOutDescriptionHandler()}
            />
          </td>
        </tr>
        <tr>
          <th>Date</th>
          <td>
            <input
              className="description-input"
              type="text"
              placeholder={reportData.date}
              onChange={(e) =>
                setReportData({ ...reportData, date: e.target.value })
              }
              onBlur={() => onFocusOutDescriptionHandler()}
            />
          </td>
        </tr>
        <tr>
          <th>Comments</th>
          <td>
            <input
              className="description-input"
              type="text"
              placeholder={reportData.comments}
              onChange={(e) =>
                setReportData({ ...reportData, comments: e.target.value })
              }
              onBlur={() => onFocusOutDescriptionHandler()}
            />
          </td>
        </tr>
      </table>
    </>
  );
}

export default ReportDetails;
