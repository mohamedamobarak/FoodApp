import {  useNavigate  } from "react-router-dom";
import logo from "../../../assets/Images/Logo1.png";
import { useForm } from "react-hook-form";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

export function ForgetPass() {

  
const navigate = useNavigate();
  let {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  let onSubmit = async (data) => {
    /// ----------------- Success --------------------------
    try {
      let response = await axios.post(
        "https://upskilling-egypt.com:3006/api/v1/Users/Reset/Request",
        data
      );
      console.log(response.data.token);

      localStorage.setItem("Token", response.data.token); // Save token on local storge

      toast.success(response?.data?.message || "Sending verifying code to your Email please check");

      setTimeout(() => {
        navigate('/reset-password'); // To  "/dashboard" to your target route
      }, 3000);

    } 
    
    /// ----------------- fail --------------------------

    catch (error) {
      console.error(error.response.data.message);

      toast.error(error.response?.data?.message || "Login failed!");
    }
  };
  return (
    <>
      <div className="  authContainer   ">
        <div className="container-fluid overlay">
          <div className="row vh-100  justify-content-center align-items-center">
            
            <div className="col-md-5 bg-white py-3 px-5 rounded-3">

            {/* toaster  container Tag*/}

            <ToastContainer position="top-center"  autoClose={3000}/>    

              <div className="logoContainer text-center">
                <img src={logo} alt="logo" className=" w-50" />
              </div>
              <div className="title">
                <h3 className="h5">Forgot Your Password?</h3>
                <p className="text-muted">

                No worries! Please enter your email and we will send a password reset link                 </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)}>
                {/* Email */}
                <div className="input-group pt-4">
                  <span className="input-group-text" id="basic-addon1">
                    <i className="fa-solid fa-envelope"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control "
                    placeholder="Email"
                    aria-label="Email"
                    aria-describedby="basic-addon1"
                    id="email"
                    // -----------------Email Validation ---------------------
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value:
                          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: "Please enter a valid email",
                      },
                    })}
                  />
                </div>
                {errors.email && (
                  <span className="text-danger mb-2">{errors.email.message}</span>
                )}

                
                {/* Button */}

                <button className="btn btn-success w-100 my-4" type="submit">
                Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ForgetPass;
