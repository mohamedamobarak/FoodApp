import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../Shared/Header/Header";
import userImg from '../../../assets/Images/dashboard-side-img.png';
import NoData from "../../Shared/NoData/NoData";



export default function CategoriesList() {
  const [categories, setCategories] = useState([]);

  const getAllCategories = async () => {
    try {
      const response = await axios.get(
        "https://upskilling-egypt.com:3006/api/v1/Category/?pageSize=10&pageNumber=1",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
          },
        }
      );
      setCategories(response.data.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <>
      <Header
        title="Categories List"
        description="You can now view all categories available in the system."
        img={userImg}
      />

      <div className=" mt-4">
        {/* Section Title */}
        <div className="mb-4">
          <h3>Categories list Details</h3>
          <p>You can check all category details below.</p>
        </div>


        {categories.length > 0 ? (
  <table className="table table-bordered table-hover">
    <thead className="bg-info text-white">
      <tr className="bg-success text-white">
        <th scope="col">ID</th>
        <th scope="col">Name</th>
        <th scope="col">Creation Date</th>
        <th scope="col">Actions</th>
      </tr>
    </thead>
    <tbody>
      {categories.map((category) => (
        <tr key={category.id}>
          <td>{category.id}</td>
          <td>{category.name}</td>
          <td>{new Date(category.creationDate).toLocaleDateString()}</td>
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
  );}

