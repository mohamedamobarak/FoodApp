
import {  useNavigate } from "react-router-dom";
import logo from "../../../assets/Images/Logo1.png";
import { useForm } from "react-hook-form";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function  VerifyAccount() {
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      let response = await axios.put(
        "https://upskilling-egypt.com:3006/api/v1/Users/verify",
        data
      );

      localStorage.setItem("Token", response.data.token);

      toast.success(response?.data?.message || "Proccesing Success");

      setTimeout(() => {
        navigate("/dashboard");
      }, 3000);
    } catch (error) {
      console.error(error.response.data.message);
      toast.error(error.response?.data?.message || "Proccesing failed!");
    }
  };

  return (
    <>
      <div className="authContainer">
        <div className="container-fluid overlay">
          <div className="row vh-100 justify-content-center align-items-center">
            <div className="col-md-5 bg-white py-3 px-5 rounded-3">
              <ToastContainer position="top-center" autoClose={3000} />
              <div className="logoContainer text-center">
                <img src={logo} alt="logo" className="w-50" />
              </div>
              <div className="title">
                <h3 className="h5">  Verify Account  </h3>
                <p className="text-muted">
                Please Enter Your OTP  or Check Your Inbox  </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                  <div className="col-md-12">
                    <div className="input-group mb-1">
                      <span className="input-group-text">
                      <i className="fa fa-envelope" aria-hidden="true"></i>
                      </span>

                      {/* Email */}

                      <input
                        type="email"
                        className="form-control"
                        placeholder="Email"
                        {...register("email", {
                          required: "Email is required",

                          // -----------------Email Validation ---------------------

                          pattern: {
                            value:
                              /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                            message: "Please enter a valid email",
                          },
                        })}
                      />
                    </div>
                    {errors.email && (
                      <span className="text-danger">
                        {errors.email.message}
                      </span>
                    )}
                  </div>
                            {/* code Icon */}
                  <div className="col-md-12">
                    <div className="input-group mb-1">
                      <span className="input-group-text">
                      <i className="fa-solid fa-key"></i>
                      </span>

                     
                      {/* code */}

                      <input
                        type="text"
                        className="form-control"
                        placeholder="code"
                        {...register("code", {
                          required: "code number is required",
        
                        })}
                      />
                    </div>
                    {errors.code && (
                      <span className="text-danger">
                        {errors.code.message}
                      </span>
                    )}
                  </div>
                </div>

                {/* Button */}

                <button className="btn btn-success w-100 mt-3" type="submit">
                  Send
                </button>
                <div className="Links d-flex justify-content-between my-3">
                 
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
