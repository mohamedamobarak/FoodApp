// import PropTypes from "prop-types";


// eslint-disable-next-line react/prop-types
export default function Header({ title, description ,img }) {
  return (

    <div className="m-2  ">
    <div className="container-fluid  bg-success text-white rounded-4  overflow-hidden  ">
      <div className="row align-items-center header-background  ">
        {/* Text Part*/}
        <div className="col-lg-7 col-md-8">
          <div className="caption text-left">
            <h3>{title}</h3>
            <p>{description}</p>
          </div>
        </div>

        {/* Image part*/}
        <div className="col-lg-5 col-md-4 d-flex justify-content-center  ">
          <div className="img-container  ">
          <img src={img}/>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

// // props
// Header.propTypes = {
//   title: PropTypes.string,
//   description: PropTypes.string,
// };

// // props
// Header.defaultProps = {
//   title: "Default Title",
//   description: "This is a default description.",
// };
