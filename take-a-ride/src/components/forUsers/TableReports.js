import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { RiDeleteBin2Line as DeleteButton } from "react-icons/ri";
import { RiEditLine as EditIcon } from "react-icons/ri";
import Table from "react-bootstrap/Table";
import UserContext from "../UserContext";
import axios from "axios";

function TableReports() {
  const { token } = useContext(UserContext);
  const [reports, setReports] = useState([]);

  useEffect(() => {
    axios
      .get("https://sf-final-project-be.herokuapp.com/api/cases/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res);
        setReports(res.data.data);
      });
  }, []); // <-- empty dependencies to run only on mount

  async function deleteReportHandler(id) {
    await axios
      .delete(`https://sf-final-project-be.herokuapp.com/api/cases/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log("Report deleted successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
      });

    // reload teble after deleting the case
    await axios
      .get("https://sf-final-project-be.herokuapp.com/api/cases/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setReports(res.data.data);
      });
  }

  const navigate = useNavigate();

  return (
    <>
      <Table striped bordered hover id="table-main-container">
        <thead>
          <tr>
            <th>Name</th>
            <th>License N.</th>
            <th>Bike type</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report) => {
            return (
              <tr>
                <td>{report.ownerFullName}</td>
                <td>{report.licenseNumber}</td>
                <td>{report.type}</td>
                <td id="table-icons">
                  <EditIcon
                    className="table-icon"
                    onClick={() =>
                      navigate(`/allreports/${report._id}`, {
                        state: report._id,
                      })
                    }
                  />

                  <DeleteButton
                    className="table-icon"
                    onClick={() => {
                      if (
                        window.confirm(`Delete report with id:${report._id}?`)
                      ) {
                        deleteReportHandler(report._id);
                      }
                    }}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
}

export default TableReports;
