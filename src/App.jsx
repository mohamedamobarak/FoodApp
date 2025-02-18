
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import AuthLayout from './Modules/Shared/AuthLayout/AuthLayout'
import Login from './Modules/Authentication/Login/Login'
import Register from './Modules/Authentication/Register/Register'
import ForgetPass from './Modules/Authentication/Forget-Pass/ForgetPass'
import ResetPass from './Modules/Authentication/Reset-Pass/ResetPass'
import VerifyAccount from './Modules/Authentication/Verify-account/VerifyAccount'
import Notfound from './Modules/Shared/Notfound/Notfound'
import MasterLayout from './Modules/Shared/MasterLayout/Masterlayout'
import Dashboard from './Modules/Dashboard/Dashboard'
import RecipesList from './Modules/Recipes/RecipesList/RecipesList'
import RecipesData from './Modules/Recipes/RecipesData/RecipesData'
import CategoriesList from './Modules/Categories/CategoriesList/CategoriesList'
import CategoriesData from './Modules/Categories/CategoriesData/CategoriesData'
import UsersList from './Modules/Users/Userslist/UsersList'

function App() {

  return (
    <>
 <BrowserRouter>

                        {/* AuthLayout */}

      <Routes>
        <Route path="" element={<AuthLayout />} >
          <Route index element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forget-password" element={<ForgetPass />} />
          <Route path="reset-password" element={<ResetPass />} />
          <Route path="verify-account" element={<VerifyAccount />} />
          <Route path="*" element={<Notfound />} />       {/* errorElement */}
        </Route>

                       {/* Dashboard */}

        <Route path="/dashboard" element={<MasterLayout/>} >
          <Route index element={<Dashboard/>} />
          <Route path="recipes" element={<RecipesList />} />
          <Route path="recipes-data" element={<RecipesData />} />
          <Route path="categories" element={<CategoriesList />} />
          <Route path="categories-data" element={<CategoriesData />} />
          <Route path="Users-list" element={<UsersList />} />
          <Route path="*" element={<Notfound />} />         {/* errorElement */}

        </Route>
      </Routes>
    </BrowserRouter>

    </>
  )
}

export default App
