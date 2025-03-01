import {  useNavigate  } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { axiosInstance, USERS_URLS } from "../../../Services/URLs/urls";

export function ForgetPass() {

  
const navigate = useNavigate();
  let {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  let onSubmit = async (data) => {
    /// ----------------- Success --------------------------
    try {
      let response = await axiosInstance.post(
        USERS_URLS.FORGET_PASS,
        data
      );
      console.log(response.data.token);

      localStorage.setItem("Token", response.data.token); // Save token on local storge

      toast.success(response?.data?.message || "Sending verifying code to your Email please check");

      setTimeout(() => {
        navigate('/reset-password'); // To  "/dashboard" to your target route
      }, 3000);

    } 
    
    /// ----------------- fail --------------------------

    catch (error) {
      console.error(error.response.data.message);

      toast.error(error.response?.data?.message || "Login failed!");
    }
  };
  return (
    <>
      

            {/* toaster  container Tag*/}

            <ToastContainer position="top-center"  autoClose={3000}/>    
              <div className="title text-start">
                <h3 className="h5">Forgot Your Password?</h3>
                <p className="text-muted">

                No worries! Please enter your email and we will send a password reset link                 </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)}>
                {/* Email */}
                <div className="input-group pt-4">
                  <span className="input-group-text" id="basic-addon1">
                    <i className="fa-solid fa-envelope"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control "
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
                  <span className="text-danger mb-2">{errors.email.message}</span>
                )}

                
                {/* Button */}

                <button className="btn btn-success w-100 my-4" type="submit">
                Submit
                </button>
              </form>
            
    </>
  );
}

export default ForgetPass;
