import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../Shared/Header/Header";
import userImg from "../../../assets/Images/recipes-side-img.png";
import NoData from "../../Shared/NoData/NoData";
import deleteImg from "../../../assets/Images/Delete img.svg";


export default function UsersList() {
  const [users, setUsers] = useState([]);
  const [userID, setUserID] = useState("");

  const getAllUsers = async () => {
    try {
      const response = await axios.get(
        "https://upskilling-egypt.com:3006/api/v1/Users/?pageSize=5&pageNumber=1",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
          },
        }
      );
      setUsers(response.data.data);
    } catch (error) {
      console.error("Error fetching Users:", error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(
        `https://upskilling-egypt.com:3006/api/v1/Users/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
          },
        }
      );

      // close modal
      document.getElementById("closeModalBtn").click();
      // update
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Error deleting User:", error);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <>
      <Header
        title="Users List"
        description="You can now view all Users available in the system."
        img={userImg}
      />

      <div className="mt-4">
        {/* Section Title */}
        <div className="mb-4 d-flex justify-content-between p-2">
          <div>
            <h3>Users List Details</h3>
            <p>You can check all users' details below.</p>
          </div>
          <button className="btn btn-success w-25 m-1">ADD</button>
        </div>

        {/* Modal for Deletion Confirmation */}
        <div
          className="modal fade"
          id="staticBackdrop"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title text-danger fw-bold">Confirm Deletion</h5>
                <button
                  id="closeModalBtn"
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body d-flex flex-column justify-content-center align-items-center text-center">
                <img
                                    src={deleteImg}
                                    alt="Delete Confirmation"
                                    className="mb-3"
                                  />
                <h4 className="text-dark fw-bold">Delete This User?</h4>
                <p>Are you sure you want to delete this user? If so, click on delete.</p>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                  Close
                </button>
                <button type="button" className="btn btn-danger btn-sm" onClick={() => deleteUser(userID)}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>

        {users.length > 0 ? (
          <table className="table table-bordered table-hover">
            <thead className="bg-info text-white">
              <tr className="bg-success text-white">
                <th scope="col">ID</th>
                <th scope="col">User Name</th>
                <th scope="col">Email</th>
                <th scope="col">Phone Number</th>
                <th scope="col">Image</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.userName}</td>
                  <td>{user.email}</td>
                  <td>{user.phoneNumber}</td>
                  <td>
                    <img
                      src={`https://upskilling-egypt.com:3006/${user.imagePath}`}
                      className="w-25"
                      alt="User"
                    />
                  </td>
                  <td>
                    <div className="d-flex gap-2">
                      <button className="btn btn-warning btn-sm">Edit</button>
                      <button
                        className="btn btn-danger btn-sm"
                        data-bs-toggle="modal"
                        data-bs-target="#staticBackdrop"
                        onClick={() => setUserID(user.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <NoData />
        )}
      </div>
    </>
  );
}
