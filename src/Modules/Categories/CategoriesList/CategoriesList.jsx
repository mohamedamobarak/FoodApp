import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../Shared/Header/Header";
import userImg from "../../../assets/Images/dashboard-side-img.png";
import NoData from "../../Shared/NoData/NoData";
import deleteImg from "../../../assets/Images/Delete img.svg";

export default function CategoriesList() {
  const [categories, setCategories] = useState([]);
  const [categoryID, setCategoryID] = useState("");

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

  const deleteCategory = async (id) => {
    try {
      await axios.delete(
        `https://upskilling-egypt.com:3006/api/v1/Category/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
          },
        }
      );

      // Update
      setCategories((prev) => prev.filter((category) => category.id !== id));

      // Close modal
      document.getElementById("closeModalBtn").click();
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  return (
    <>
      <Header
        title="Categories List"
        description="You can now view all categories available in the system."
        img={userImg}
      />

      {/* Section Title */}
      <div className="mb-4 d-flex justify-content-between p-2">
        <div>
          <h3>Categories List</h3>
          <p>You can check all category details below.</p>
        </div>

        <button className="btn btn-success w-25 m-1">ADD</button>
      </div>

      <div className="mt-4">
        {/* Section Title */}
        <div className="mb-4 d-flex justify-content-between p-2">
          <div>
            <h3>Categories List Details</h3>
            <p>You can check all Users details below.</p>
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
                  <h5 className="modal-title text-danger fw-bold">
                    Confirm Deletion
                  </h5>
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
                  <h4 className="text-dark fw-bold">Delete This Category?</h4>
                  <p>
                    Are you sure you want to delete this item? If you are sure,
                    just click on delete it.
                  </p>
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={() => deleteCategory(categoryID)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Categories Table */}
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
                  <td>
                    {new Date(category.creationDate).toLocaleDateString()}
                  </td>
                  <td>
                    <div className="d-flex gap-2">
                      <button className="btn btn-warning btn-sm">Edit</button>
                      <button
                        className="btn btn-danger btn-sm"
                        type="button"
                        data-bs-toggle="modal"
                        data-bs-target="#staticBackdrop"
                        onClick={() => setCategoryID(category.id)}
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
