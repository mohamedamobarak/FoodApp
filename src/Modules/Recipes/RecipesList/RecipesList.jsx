import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../Shared/Header/Header";
import recipesImg from "../../../assets/Images/recipes-side-img.png";
import NoData from "../../Shared/NoData/NoData";
import deleteImg from "../../../assets/Images/Delete img.svg";

export default function RecipesList() {
  const [recipes, setRecipes] = useState([]);
  const [recipeID, setRecipeID] = useState("");

  const getAllRecipes = async () => {
    try {
      const response = await axios.get(
        "https://upskilling-egypt.com:3006/api/v1/Recipe/?pageSize=10&pageNumber=1",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
          },
        }
      );
      setRecipes(response.data.data);
    } catch (error) {
      console.error("Error fetching Recipes:", error);
    }
  };

  const deleteRecipe = async (id) => {
    try {
      await axios.delete(
        `https://upskilling-egypt.com:3006/api/v1/Recipe/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
          },
        }
      );

      document.getElementById("closeModalBtn").click();
      setRecipes(recipes.filter((recipe) => recipe.id !== id));
    } catch (error) {
      console.error("Error deleting Recipe:", error);
    }
  };

  useEffect(() => {
    getAllRecipes();
  }, []);

  return (
    <>
      <Header 
        title="Recipes Items" 
        description="You can now add your items that any user can order from the application and you can edit." 
        img={recipesImg} 
      />

      <div className="mb-4 d-flex justify-content-between p-2">
        <div>
          <h3>Recipes List Details</h3>
          <p>You can check all recipe details below.</p>
        </div>
        <button className="btn btn-success w-25 m-1">ADD</button>
      </div>

      <div
        className="modal fade"
        id="deleteModal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="deleteModalLabel"
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
              <h4 className="text-dark fw-bold">Delete This Recipe?</h4>
              <p>Are you sure you want to delete this recipe? If so, click on delete.</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
              <button type="button" className="btn btn-danger btn-sm" onClick={() => deleteRecipe(recipeID)}>
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      {recipes.length > 0 ? (
        <table className="table table-bordered table-hover">
          <thead className="bg-info text-white">
            <tr className="bg-success text-white">
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Image</th>
              <th scope="col">Description</th>
              <th scope="col">Price</th>
              <th scope="col">Creation Date</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {recipes.map((recipe) => (
              <tr key={recipe.id}>
                <td>{recipe.id}</td>
                <td>{recipe.name}</td>
                <td className="d-flex justify-content-center"> 
                  <img
                    src={`https://upskilling-egypt.com:3006/${recipe.imagePath}`}
                    className="w-25"
                    alt="Recipe"
                  />
                </td>
                <td>{recipe.description}</td>
                <td>{recipe.price} EGP</td>
                <td>{new Date(recipe.creationDate).toLocaleDateString()}</td>
                <td>
                  <div className="d-flex gap-2">
                    <button className="btn btn-warning btn-sm">Edit</button>
                    <button
                      className="btn btn-danger btn-sm"
                      data-bs-toggle="modal"
                      data-bs-target="#deleteModal"
                      onClick={() => setRecipeID(recipe.id)}
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
    </>
  );
}
