import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { axiosInstance, USERS_URLS } from "../../../Services/URLs/urls";
import {
  CONFIRM_PASSWORD_VALIDATION,
  EMAIL_VALIDATION,
  PASSWORD_VALIDATION,
  PHONE_VALIDATION,
} from "../../../Services/validation/validation";

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
      let response = await axiosInstance.post(USERS_URLS.REGISTER, data);
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
      <ToastContainer position="top-center" autoClose={3000} />
      <div className="title text-start">
        <h3 className="h5">Register</h3>
        <p className="text-muted">Welcome! Please enter your details.</p>
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
              <span className="text-danger">{errors.userName.message}</span>
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
                {...register(
                  "email",

                  // -----------------Email Validation ---------------------
                  EMAIL_VALIDATION
                )}
              />
            </div>
            {errors.email && (
              <span className="text-danger">{errors.email.message}</span>
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
              <span className="text-danger">{errors.country.message}</span>
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
                // -----------------Phone Number Validation ---------------------

                {...register("phoneNumber", PHONE_VALIDATION)}
              />
            </div>
            {errors.phoneNumber && (
              <span className="text-danger">{errors.phoneNumber.message}</span>
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
                // -----------------Password Validation ---------------------
                {...register("password", PASSWORD_VALIDATION)}
              />
            </div>
            {errors.password && (
              <span className="text-danger">{errors.password.message}</span>
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
                // --------------- Confirm Password Validation ---------------------
                {...register(
                  "confirmPassword",
                  CONFIRM_PASSWORD_VALIDATION(watch)
                )}
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
    </>
  );
}
