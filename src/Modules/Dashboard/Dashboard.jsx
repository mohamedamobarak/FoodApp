import Header from "../Shared/Header/Header";
import dashboardImg from '../../assets/Images/dashboard-side-img.png'


export default function Dashboard() {
  return (

    <>
    
    <Header title={'Welcome Mobarak'} description={'This is a welcoming screen for the entry of the application , you can now see the options'} img={dashboardImg}/>
    <div>Dashboard</div>

    </>
  )
}
