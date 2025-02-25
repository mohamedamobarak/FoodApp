import { Link, useNavigate } from "react-router-dom";
import logo from "../../../assets/Images/Logo1.png";
import { useForm } from "react-hook-form";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useState } from "react";

// eslint-disable-next-line react/prop-types
export function Login({saveLoginData}) {

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  let {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  let onSubmit = async (data) => {
  try {
    // ----------------- Success --------------------------
    let response = await axios.post(
      "https://upskilling-egypt.com:3006/api/v1/Users/Login",
      data
    );

    console.log(response.data.token);

    // Save Login data
    localStorage.setItem("Token", response.data.token); // Save token in localStorage

    toast.success(response?.data?.message || "Login Success!");

    setTimeout(() => {
      navigate("/dashboard"); // Redirect to "/dashboard"
    }, 3000);

    // بتعمل معايا error لو معملتش كده

    if (typeof saveLoginData === "function") {
      saveLoginData();              
    }

  } catch (error) {
    // ----------------- Fail --------------------------
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

              <ToastContainer position="top-center" autoClose={3000} />

              <div className="logoContainer text-center">
                <img src={logo} alt="logo" className=" w-50" />
              </div>
              <div className="title">
                <h3 className="h5">Log In</h3>
                <p className="text-muted">
                  Welcome Back! Please enter your details
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)}>
                {/* Email */}
                <div className="input-group mb-1">
                  <span className="input-group-text" id="basic-addon1">
                    <i className="fa-solid fa-envelope"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control"
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
                  <span className="text-danger">{errors.email.message}</span>
                )}

                {/* Password */}

                <div className="input-group mb-1">
                  <span className="input-group-text" id="basic-addon1">
                    <i className="fa-solid fa-lock"></i>
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    placeholder="Password"
                    aria-label="Password"
                    aria-describedby="basic-addon1"
                    id="password"
                    // ----------------- Password Validation ---------------------

                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters",
                      },
                      pattern: {
                        value:
                          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                        message:
                          "Password must contain at least one lowercase letter, one uppercase letter, one number, one special character, and be at least 8 characters long.",
                      },
                    })}
                  />
                  {/* eye Icon */}
                  <span
                    className="position-absolute end-0 top-50 translate-middle-y me-3"
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    <i
                      className={`fa-solid ${
                        showPassword ? "fa-eye" : "fa-eye-slash"
                      }`}
                    ></i>
                  </span>
                </div>
                {errors.password && (
                  <span className="text-danger">{errors.password.message}</span>
                )}

                {/* Links ( Register & forget Password) */}

                <div className="Links d-flex justify-content-between my-3 ">
                  <Link
                    to="register"
                    className="text-dark text-decoration-none"
                  >
                    Register Now
                  </Link>

                  <Link
                    to="forget-password"
                    className="text-success text-decoration-none"
                  >
                    Forget Password?
                  </Link>
                </div>

                {/* Button */}

                <button className="btn btn-success w-100" type="submit">
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
