import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../Shared/Header/Header";
import userImg from '../../../assets/Images/dashboard-side-img.png';
import NoData from "../../Shared/NoData/NoData";

export default function UsersList() {
  const [users, setUsers] = useState([]);

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

      <div className=" mt-4">
        {/* Section Title */}
        <div className="mb-4">
          <h3>Users list Details</h3>
          <p>You can check all category details below.</p>
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
      {users.map((users) => (
        <tr key={users.id}>
          <td>{users.id}</td>
          <td>{users.userName}</td>
          <td>{users.email}</td>
          <td>{users.phoneNumber}</td>
          <td><img src={`https://upskilling-egypt.com:3006/${users.imagePath}` } className="w-25"></img></td>


          <td>
            <div className="d-flex gap-2">
              <button className="btn btn-warning btn-sm">Edit</button>
              <button className="btn btn-danger btn-sm">Delete</button>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
) : (
  <NoData/>
)}  
      </div>
    </>
  );
}
