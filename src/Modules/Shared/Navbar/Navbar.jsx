import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const saveUserName = () => {
      let Token = localStorage.getItem("Token");

      if (Token) {
        try {
          setUserName(jwtDecode(Token).userName);
        } catch (error) {
          console.error("Invalid Token:", error);
        }
      }
    };

    saveUserName();
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-3">
      <div className="container-fluid">
        {/*small screen menu*/}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>


        <li className="nav-item d-flex w-50">
  <div className="input-group w-100 rounded">
    <span className="input-group-text border-0 bg-light" id="search-addon">
      <i className="fas fa-search"></i>
    </span>
    <input 
      type="search" 
      className="form-control rounded" 
      placeholder="Search" 
      aria-label="Search" 
      aria-describedby="search-addon" 
    />
  </div>
</li>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
            {/* User Icon*/}
            <li className="nav-item me-2">
              <i className="fa-solid fa-circle-user fa-2xl"></i>
            </li>

            {/* User Name*/}
            <li className="nav-item">
              <span className="nav-link">{userName || "Guest"}</span>
            </li>

            {/* Menu Bar*/}
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              ></a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <a className="dropdown-item" href="#">
                    #
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    #
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    #
                  </a>
                </li>
              </ul>
            </li>

            {/* Notification Icon*/}
            <li className="nav-item me-3">
              <i className="fa-solid fa-bell fa-lg"></i>
            </li>

            
          </ul>
        </div>
      </div>
    </nav>
  );
}
