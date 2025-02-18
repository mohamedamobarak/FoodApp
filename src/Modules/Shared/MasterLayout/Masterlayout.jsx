import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import Header from "../Header/Header";

export default function MasterLayout() {
  return (
<>

<div className="d-flex">
    <div className="d-flex w-25 bg-primary ">

   <Sidebar/>

    </div>
    <div className="w-75 bg-warning">
      <Navbar/>
      <Header/>
    <Outlet></Outlet>

 </div>
 
 </div>

   </>
  )
}
