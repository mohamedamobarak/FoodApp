import { useEffect, useState } from "react"; 
import Header from "../../Shared/Header/Header";
import userImg from "../../../assets/Images/dashboard-side-img.png";
import NoData from "../../Shared/NoData/NoData";
import deleteImg from "../../../assets/Images/Delete img.svg";
import { axiosInstance, CATEGORIES_URLS } from "../../../Services/URLs/urls";

export default function CategoriesList() {
  const [categories, setCategories] = useState([]);
  const [categoryID, setCategoryID] = useState("");
  const [loading, setLoading] = useState(true); // set loading

  const getAllCategories = async () => {
    try {
      const response = await axiosInstance.get(
        CATEGORIES_URLS.GET_CATEGORIES(1),
        {
          
        }
      );
      setCategories(response.data.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false); // `setLoading(false)`finally`
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  const deleteCategory = async (id) => {
    try {
      await axiosInstance.delete(
        CATEGORIES_URLS.DELETE_CATEGORY(id),
      );

      // Update the list
      setCategories((prev) => prev.filter((category) => category.id !== id));

      //  close modal
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
        <div >
          <button className="btn btn-success px-5 py-2">
          Add New Category
          </button>
        </div>
      </div>

      <div className="mt-4">
        {/* Section Title */}
        <div className="mb-4 d-flex justify-content-between p-2">
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
                  <img src={deleteImg} alt="Delete Confirmation" className="mb-3" />
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
        {loading ? (
          <div className="text-center my-5">
            <div className="spinner-border text-success" role="status"></div>
            <p className="mt-2 fw-bold text-success">Loading categories...</p>
          </div>
        ) : categories.length > 0 ? (
          <div className="table-responsive">
            <table className="table table-borderless table-hover bg-danger">
              <thead className="table-danger">
                <tr className="text-danger">
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
                    <div className="container text-center">
    <div className="dropdown">
        <button className="btn btn-light border-0" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
        <i className="fa-solid fa-ellipsis"></i>
        </button>
        <ul className="dropdown-menu dropdown-menu-end text-center " aria-labelledby="dropdownMenuButton">

              <li><button className="btn btn-sm">Edit</button></li>
              <li><button
                className="btn btn-sm"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
                onClick={()=>setCategoryID(category.id)}
              >
                Delete
              </button></li>
          
        </ul>
    </div>
</div>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <NoData />
        )}
      </div>
    </>
  );
}
