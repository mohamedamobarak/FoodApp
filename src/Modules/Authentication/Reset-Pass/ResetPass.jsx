
import {  useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ResetPass() {
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      let response = await axios.post(
        "https://upskilling-egypt.com:3006/api/v1/Users/Reset",
        data
      );

      localStorage.setItem("Token", response.data.token);

      toast.success(response?.data?.message || "Proccesing Success");

      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      console.error(error.response.data.message);
      toast.error(error.response?.data?.message || "Proccesing failed!");
    }
  };

  return (
    <>
    
              <ToastContainer position="top-center" autoClose={3000} />
              <div className="title text-start">
                <h3 className="h5"> Reset  Password</h3>
                <p className="text-muted">
                Please Enter Your OTP  or Check Your Inbox  </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                  <div className="col-md-12">
                    <div className="input-group mb-1">
                      <span className="input-group-text">
                        <i className="fa-solid fa-user"></i>
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

                  <div className="col-md-12">
                    <div className="input-group mb-1">
                      <span className="input-group-text">
                        
                      <i className="fa fa-envelope" aria-hidden="true"></i>
                      </span>

                     
                      {/* OTP */}

                      <input
                        type="text"
                        className="form-control"
                        placeholder="OTP"
                        {...register("seed", {
                          required: "OTP number is required",
        
                        })}
                      />
                    </div>
                    {errors.seed && (
                      <span className="text-danger">
                        {errors.seed.message}
                      </span>
                    )}
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-12">
                    <div className="input-group mb-1">
                      <span className="input-group-text">
                        <i className="fa-solid fa-lock"></i>
                      </span>
                      {/* Password */}

                      <input
                        type="password"
                        className="form-control"
                        placeholder="New Password"
                        {...register("password", {
                          // -----------------Password Validation ---------------------

                          required: "Password is required",
                          minLength: {
                            value: 8,
                            message:
                              "Password must be at least 8 characters long",
                          },
                          pattern: {
                            value:
                              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                            message:
                              "Password must include uppercase, lowercase, number, and special character",
                          },
                        })}
                      />
                    </div>
                    {errors.password && (
                      <span className="text-danger">
                        {errors.password.message}
                      </span>
                    )}
                  </div>

                  <div className="col-md-12">
                    <div className="input-group mb-1">
                      <span className="input-group-text">
                        <i className="fa-solid fa-lock"></i>
                      </span>
                      {/* Confirm Password */}

                      <input
                        type="password"
                        className="form-control"
                        placeholder="Confirm New Password"
                        {...register("confirmPassword", {
                          // --------------- Confirm Password Validation ---------------------

                          required: "Confirm Password is required",
                          validate: (value) =>
                            value === watch("password") ||
                            "Passwords do not match",
                        })}
                      />
                    </div>
                    {errors.confirmPassword && (
                      <span className="text-danger">
                        {errors.confirmPassword.message}
                      </span>
                    )}
                  </div>
                </div>
                {/* Button */}

                <button className="btn btn-success w-100 mt-3" type="submit">
                  Reset Password
                </button>
                <div className="Links d-flex justify-content-between my-3">
                  {/* Link to login page */}

                  {/* <Link to="/" className="text-dark text-decoration-none">
                    Already have an account? Log in
                  </Link> */}
                </div>
              </form>
           
    </>
  );
}
