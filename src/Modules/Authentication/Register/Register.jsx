import { Link, useNavigate } from "react-router-dom";
import logo from "../../../assets/Images/Logo1.png";
import { useForm } from "react-hook-form";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Register() {
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
        "https://upskilling-egypt.com:3006/api/v1/Users/Register",
        data
      );
      console.log(response.data.token);

      toast.success(response?.data?.message || "Register Success");

      setTimeout(() => {
        navigate("/verify-account");
      }, 3000);
    } catch (error) {
      console.error(error.response.data.message);
      toast.error(error.response?.data?.message || "Register failed!");
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
                <h3 className="h5">Register</h3>
                <p className="text-muted">
                  Welcome! Please enter your details.
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="input-group mb-1">
                      <span className="input-group-text">
                        <i className="fa-solid fa-user"></i>
                      </span>

                      {/* userName */}

                      <input
                        type="text"
                        className="form-control"
                        placeholder="Username"
                        {...register("userName", {
                          required: "Username is required",
                        })}
                      />
                    </div>
                    {errors.userName && (
                      <span className="text-danger">
                        {errors.userName.message}
                      </span>
                    )}
                  </div>

                  <div className="col-md-6">
                    <div className="input-group mb-1">
                      <span className="input-group-text">
                        <i className="fa-solid fa-envelope"></i>
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

                  <div className="col-md-6">
                    <div className="input-group mb-1">
                      <span className="input-group-text">
                        <i className="fa-solid fa-globe"></i>
                      </span>

                      {/* Country */}

                      <input
                        type="text"
                        className="form-control"
                        placeholder="Country"
                        {...register("country", {
                          required: "Country is required",
                        })}
                      />
                    </div>
                    {errors.country && (
                      <span className="text-danger">
                        {errors.country.message}
                      </span>
                    )}
                  </div>

                  <div className="col-md-6">
                    <div className="input-group mb-1">
                      <span className="input-group-text">
                        <i className="fa-solid fa-phone"></i>
                      </span>

                      {/* Phone Number */}

                      <input
                        type="text"
                        className="form-control"
                        placeholder="Phone Number"
                        {...register("phoneNumber", {
                          required: "Phone number is required",

                          // -----------------Phone Number Validation ---------------------

                          pattern: {
                            value: /^(?:\+20|0)?1[0-9]{9}$/,
                            message:
                              "Please enter a valid Egyptian phone number",
                          },
                        })}
                      />
                    </div>
                    {errors.phoneNumber && (
                      <span className="text-danger">
                        {errors.phoneNumber.message}
                      </span>
                    )}
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="input-group mb-1">
                      <span className="input-group-text">
                        <i className="fa-solid fa-lock"></i>
                      </span>
                      {/* Password */}

                      <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
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

                  <div className="col-md-6">
                    <div className="input-group mb-1">
                      <span className="input-group-text">
                        <i className="fa-solid fa-lock"></i>
                      </span>
                      {/* Confirm Password */}

                      <input
                        type="password"
                        className="form-control"
                        placeholder="Confirm Password"
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
                  Register
                </button>
                <div className="Links d-flex justify-content-between my-3">
                  {/* Link to login page */}

                  <Link to="/" className="text-dark text-decoration-none">
                    Already have an account? Log in
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
