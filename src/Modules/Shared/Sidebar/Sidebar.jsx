import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../assets/Images/SmallLogo.png";
import { useState } from "react";




export default function SideBar() {

  let navigate = useNavigate()

  const [isCollapsed, setIsCollapsed] = useState(false);

let logOut =()=> {

  localStorage.removeItem("Token")
navigate("/login")
}
  let toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="sidebar-container">
      {" "}
      {/* sidebar-container */}
      <Sidebar collapsed={isCollapsed}>
        <Menu>
          <div className="noHover">
            <MenuItem
              className="noHover"
              icon={
                <img className={"logo"} src={logo} onClick={toggleCollapse} />
              }
            >
              {" "}
            </MenuItem>
          </div>

          <div className="sideBarList">
            <MenuItem
              icon={<i className="fa-solid fa-house"></i>}
              component={<Link to="/dashboard" />}
            >
              {" "}
              Home
            </MenuItem>
            <MenuItem
              icon={<i className="fa-solid fa-users"></i>}
              component={<Link to="Users-list" />}
            >
              {" "}
              Users
            </MenuItem>
            <MenuItem
              icon={<i className="fa-solid fa-receipt"></i>}
              component={<Link to="recipes" />}
            >
              {" "}
              Recipes
            </MenuItem>
            <MenuItem
              icon={<i className="fa-solid fa-layer-group"></i>}
              component={<Link to="categories" />}
            >
              {" "}
              Categories
            </MenuItem>
            <MenuItem icon={<i className="fa-solid fa-right-from-bracket"></i>}>
              {" "}
              <span className="" onClick={logOut} >Logout</span>
            </MenuItem>
          </div>
        </Menu>
      </Sidebar>
    </div>
  );
}
