import Header from "../Shared/Header/Header";
import dashboardImg from "../../assets/Images/dashboard-side-img.png";
import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <>
      <Header
        title={`Welcome`}
        description={
          "This is a welcoming screen for the entry of the application , you can now see the options"
        }
        img={dashboardImg}
      />
      {/* Section Title */}
      <div className="mb-4 d-flex justify-content-between p-4">
        <div>
          <h3>
            Fill the <span className="text-bold text-success fw-bold ">Recipes</span> !
          </h3>
          <p>
            you can now fill the meals easily using the table and form
            <br/>
            click here and sill it with the table !
          </p>
        </div>
        
<div className="d-flex align-items-center">
    <Link to="recipes-data" className="btn btn-success px-5 py-2">
        Fill Recipes <i className="fa-solid fa-arrow-right fa-lg"></i>
    </Link>
</div>
      </div>

      <div className="mt-4">
        {/* Section Title */}
        <div className="mb-4 d-flex justify-content-between p-2"></div>
      </div>
    </>
  );
}
