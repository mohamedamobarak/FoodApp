import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../Shared/Header/Header";
import userImg from '../../../assets/Images/dashboard-side-img.png';
import NoData from "../../Shared/NoData/NoData";

export default function RecipesList() {
  const [recipes, setRecipes] = useState([]);

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

  useEffect(() => {
    getAllRecipes();
  }, []);

  return (
    <>
      <Header 
        title={"Recipes Items"} 
        description={"You can now add your items that any user can order from the application and you can edit"} 
        img={userImg} 
      />

      {recipes.length > 0 ? (
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
            {recipes.map((recipe) => (
              <tr key={recipe.id}>
                <td>{recipe.id}</td>
                <td>{recipe.name}</td>
                <td>{new Date(recipe.creationDate).toLocaleDateString()}</td>
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
    </>
  );
}
