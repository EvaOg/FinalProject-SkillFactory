import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { RiDeleteBin2Line as DeleteButton } from "react-icons/ri";
import { RiEditLine as EditIcon } from "react-icons/ri";
import { LiaCheckSolid as ApprovedIcon } from "react-icons/lia";
import { GiSandsOfTime as NotApprovedIcon } from "react-icons/gi";
import Table from "react-bootstrap/Table";
import axios from "axios";
import UserContext from "../UserContext";

function TableOfficers() {
  const { token, isAuth } = useContext(UserContext);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("https://sf-final-project-be.herokuapp.com/api/officers/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res);
        setUsers(res.data.officers);
      });
  }, []); // <-- empty dependencies to run only on mount

  async function deleteUserHandler(id) {
    await axios
      .delete(`https://sf-final-project-be.herokuapp.com/api/officers/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log("User deleted successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
      });

    // reload table after sending DELETE request
    await axios
      .get("https://sf-final-project-be.herokuapp.com/api/officers/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setUsers(res.data.officers);
      });
  }
  const navigate = useNavigate();

  return (
    <div className="table-wrapper">
      <Table striped bordered hover id="table-main-container">
        <thead>
          <tr>
            <th>First name</th>
            <th>Last name</th>
            <th>Email</th>
            <th>Approved</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            return (
              <tr>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td className="table-approved-icons">
                  {user.approved ? (
                    <ApprovedIcon className="table-icon" />
                  ) : (
                    <NotApprovedIcon className="table-icon" />
                  )}
                </td>
                <td id="table-icons">
                  <EditIcon
                    className="table-icon"
                    onClick={() =>
                      navigate(`/allofficers/${user._id}`, { state: user._id })
                    }
                  />

                  <DeleteButton
                    className="table-icon"
                    onClick={() => {
                      if (
                        isAuth.id !== user._id &&
                        window.confirm(`Delete user with id:${user._id}?`)
                      ) {
                        deleteUserHandler(user._id);
                      }
                    }}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default TableOfficers;
