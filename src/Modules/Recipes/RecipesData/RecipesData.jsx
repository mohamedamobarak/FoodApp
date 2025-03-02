import { useState } from "react";
import { useForm } from "react-hook-form";
import { axiosInstance, RECIPES_URLS } from "../../../Services/URLs/urls";
import { toast, ToastContainer } from "react-toastify";


const onSubmit = async (data) => {
    try {
      let response = await axiosInstance.post(RECIPES_URLS.CREATE_RECIPE, data);
      console.log(response.data.message);

      toast.success(response?.data?.message || "Register Success");

    } catch (error) {
      console.error(error.response.data.message);
      toast.error(error.response?.data?.message || "Register failed!");
    }
  };

export default function RecipesData() {

  let {
      register,
      formState: { errors },
      handleSubmit,
    } = useForm();
  const [image, setImage] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  // التعامل مع اختيار ملف من المتصفح
  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  // التعامل مع السحب والإفلات
  const handleDragOver = (event) => {
    event.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragActive(false);

    const file = event.dataTransfer.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  return (
    <>

<ToastContainer
position="top-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick={false}
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
      <div className="mb-4 d-flex justify-content-between p-4">
        <div>
          <h3>
            Fill the <span className="text-bold text-success fw-bold">Recipes</span>!
          </h3>
          <p>
            You can now fill the meals easily using the table and form.
            <br />
            Click here and fill it using the table!
          </p>
        </div>
        <div className="d-flex align-items-center">
          <button type="button" className="btn btn-success px-5 py-2">
            All Recipes <i className="fa-solid fa-arrow-right fa-lg"></i>
          </button>
        </div>
      </div>

      <div className="container">
        <form  onSubmit={ handleSubmit(onSubmit)}>
          {/* Recipe Name */}
          <input className="form-control pt-2 mb-3" type="text" placeholder="Recipe Name"  {...register("name" ,{required: "Recipe Name is required"})}/>
          {errors.name && (
                  <span className="text-danger">{errors.name.message}</span>
                )}

          {/* Tag ID */}
          <input className="form-control pt-2 mb-3" type="number" placeholder="Tag ID" {...register("tagId" ,{required: "Tag ID is required"})}/>

          {errors.tagId && (
                  <span className="text-danger">{errors.tagId.message}</span>
                )}

          {/* Price Input with Currency */}
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Please enter the recipe price"

                {...register("price",{required: "Price is required"}) }
            />
            <div className="input-group-append">
              <span className="input-group-text fw-bold">EGP</span>
            </div>
          </div>
          {errors.price && (
                  <span className="text-danger">{errors.price.message}</span>
                )}

          {/* Category */}
          <input className="form-control py-2 mb-3" type="number" placeholder="Category" {...register("categoriesIds" ,{required: "Category ID is required"})} />
          {errors.categoriesIds && (
                  <span className="text-danger">{errors.categoriesIds.message}</span>
                )}

          {/* Recipe Description */}
          <textarea className="form-control mb-3 " rows="3" placeholder="Recipe Description" {...register("description" , {required: "Description is required"})}></textarea>

          {errors.description && (
                  <span className="text-danger">{errors.description.message}</span>
                )}

          {/* Upload Image Section (Drag & Drop) */}
          <div
            className={`form-group upload-box mb-3 p-4 text-center border rounded-1  ${dragActive ? "border-success" : "border-success"}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            style={{ cursor: "pointer", backgroundColor: dragActive ? "#e6ffe6" : "#f8f9fa" }}
          >
            {image ? (
              <img src={image} alt="Uploaded Preview" className="img-fluid rounded" style={{ maxWidth: "100%", maxHeight: "200px" }} />
            ) : (
              <>
                <p>Drag & Drop an image here or</p>
                <label className="btn btn-outline-success">
                  Choose File
                  <input type="file" className="d-none" onChange={handleFileSelect} accept="image/*" {...register("recipeImage")}/>
                </label>
                {errors.recipeImage && (
                  <span className="text-danger">{errors.recipeImage.message}</span>
                )}
              </>
            )}
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary w-100">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
