import notfoundImg from "../../../assets/Images/notfound imge.png";
import logo from "../../../assets/Images/logo1.png";
import { useNavigate } from "react-router-dom";


export default function NotFound() {

  let navigate=useNavigate();

  return (
    <>
      <div className="vh-100 d-flex flex-column justify-content-center align-items-start notfound-background text-black p-5">
      <div className="w-75 position-absolute top-0 start-0 p-3">
        <img src={logo} className="w-25" alt="Logo" />
      </div>
        <h1 className="text-center fw-bolder">Oops....</h1>
        <h3 className="text-center text-success">Page not found</h3>
        <p className="text-center">
          This Page doesn’t exist or was removed! We suggest you go back to home.
        </p>
        <div  className="not-found-container">
          <button className="btn btn-success w-100  z-index-300  " onClick={() => navigate("/dashboard")}>
          <i className="fa-solid fa-arrow-left"></i>Back to Home 
          </button>
        </div>
        <div className=" d-flex justify-content-end align-items-end w-100 position-absolute bottom-0 end-0 p-3 ">
          <img src={notfoundImg} alt="Not Found" className="img-fluid" />
        </div>
      </div>
    </>
  );
}