import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../assets/Images/SmallLogo.png";
import { useState } from "react";
import ChangePass from "../../Authentication/Change-Pass/ChangePass";

export default function SideBar() {
  let navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const logOut = () => {
    localStorage.removeItem("Token");
    navigate("/login");
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="sidebar-container">
      <Sidebar collapsed={isCollapsed}>
        <Menu>
          <div className="m-auto d-flex justify-content-center">
            <div className="noHover">
              <MenuItem
                className="noHover"
                icon={<img className="logo" src={logo} alt="Logo" onClick={toggleCollapse} />}
              />
            </div>
          </div>

          <div className="sideBarList">
            <MenuItem icon={<i className="fa-solid fa-house"></i>} component={<Link to="" />}>
              Home
            </MenuItem>
            <MenuItem icon={<i className="fa-solid fa-users"></i>} component={<Link to="Users-list" />}>
              Users
            </MenuItem>
            <MenuItem icon={<i className="fa-solid fa-receipt"></i>} component={<Link to="recipes" />}>
              Recipes
            </MenuItem>
            <MenuItem icon={<i className="fa-solid fa-layer-group"></i>} component={<Link to="categories" />}>
              Categories
            </MenuItem>

            <MenuItem icon={<i className="fa-solid fa-lock"></i>} onClick={() => setShowModal(true)}>
              Change Password
            </MenuItem>

            <MenuItem icon={<i className="fa-solid fa-right-from-bracket"></i>}>
              <span onClick={logOut}>Logout</span>
            </MenuItem>
          </div>
        </Menu>
      </Sidebar>

      {/* Modal for Change Password */}
      {showModal && (
  <>
    {/* Overlay (الخلفية المعتمة) */}
    <div className="modal-backdrop fade show" onClick={() => setShowModal(false)}></div>

    {/* Modal Content */}
    <div className="modal fade show d-block" tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content border-0">
          <div className="modal-header border-0">
            <button type="button" className="btn-close p-0" onClick={() => setShowModal(false)}></button>
          </div>
          <div className="modal-body p-4">
            <ChangePass />
          </div>
        </div>
      </div>
    </div>
  </>
)}

    </div>
  );
}