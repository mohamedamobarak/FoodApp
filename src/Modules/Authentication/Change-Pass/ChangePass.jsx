import { useState } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";

import logo from "../../../assets/Images/Logo1.png";
import { axiosInstance, USERS_URLS } from "../../../Services/URLs/urls";
import { CONFIRM_NEW_PASSWORD_VALIDATION, NEW_PASSWORD_VALIDATION, PASSWORD_VALIDATION } from "../../../Services/validation/validation";

export default function ChangePass() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      let response = await axiosInstance.put(
        USERS_URLS.CHANGE_PASS,
        data
      );

      toast.success(response?.data?.message || "Password changed successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to change password!");
    }
  };

  return (
    <>
      <div className="d-flex justify-content-center align-items-center">
        <div className="col-md-12 bg-white rounded-3 shadow text-center">
          {/* Logo */}
          <div className="mb-3">
            <img src={logo} alt="logo" className="w-50" />
          </div>

          {/* Title */}
          <div className="mb-3 text-start">
            <h3 className="h5">Change your Password</h3>
            <p className="text-muted">Enter your new password below</p>
          </div>

          {/* Toast Messages */}
          <ToastContainer position="top-center" autoClose={3000} />

          {/* Change Password Form */}
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* old Password */}

            <div className="input-group mb-3">
              <span className="input-group-text">
                <i className="fa-solid fa-lock"></i>
              </span>
              
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                placeholder="Old Password"
                {...register("oldPassword", PASSWORD_VALIDATION)}
              />
              <span
                className="position-absolute end-0 top-50 translate-middle-y me-3"
                onClick={() => setShowPassword(!showPassword)}
                style={{ cursor: "pointer" }}
              >
                <i className={`fa-solid ${showPassword ? "fa-eye" : "fa-eye-slash"}`}></i>
              </span>
            </div>
            {errors.oldPassword && <span className="text-danger">{errors.oldPassword.message}</span>}

            {/*  NEW Password */}

            <div className="input-group mb-3">
              <span className="input-group-text">
                <i className="fa-solid fa-lock"></i>
              </span>
              
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                placeholder="New Password"
                {...register("newPassword", NEW_PASSWORD_VALIDATION)}
              />
              <span
                className="position-absolute end-0 top-50 translate-middle-y me-3"
                onClick={() => setShowPassword(!showPassword)}
                style={{ cursor: "pointer" }}
              >
                <i className={`fa-solid ${showPassword ? "fa-eye" : "fa-eye-slash"}`}></i>
              </span>
            </div>
            {errors.newPassword && <span className="text-danger">{errors.newPassword.message}</span>}

            {/* Confirm NEW Password */}
            <div className="input-group mb-3">
              <span className="input-group-text">
                <i className="fa-solid fa-lock"></i>
              </span>
              <input
                type={showConfirmPassword ? "text" : "password"}
                className="form-control"
                placeholder="Confirm Password"
                {...register("confirmNewPassword", CONFIRM_NEW_PASSWORD_VALIDATION(watch))}
              />
              <span
                className="position-absolute end-0 top-50 translate-middle-y me-3"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                style={{ cursor: "pointer" }}
              >
                <i className={`fa-solid ${showConfirmPassword ? "fa-eye" : "fa-eye-slash"}`}></i>
              </span>
            </div>
            {errors.confirmNewPassword && <span className="text-danger">{errors.confirmNewPassword.message}</span>}

            {/* Submit Button */}
            <button className="btn btn-success w-100 mt-3" type="submit">
              Change Password
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
