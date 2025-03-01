import { Outlet } from "react-router-dom";
import logo from "../../../assets/Images/Logo1.png";

export default function AuthLayout() {
  return (
    <div className="authContainer d-flex justify-content-center align-items-center vh-100">
      {/* Overlay */}
      <div className="container-fluid overlay vh-100 d-flex justify-content-center align-items-center">
        <div className="col-md-5 bg-white py-4 px-5 rounded-3 shadow text-center">
          {/* Logo */}
          <div className="mb-3">
            <img src={logo} alt="logo" className="w-50" />
          </div>
          {/* Outlet for Login Form */}
          <Outlet />
        </div>
      </div>
    </div>
  );
}
