// import PropTypes from "prop-types";

// eslint-disable-next-line react/prop-types
export default function Header({ title, description }) {
  return (
    <div className="container-fluid p-4 bg-success text-white">
      <div className="row align-items-center">
        {/* Text Part*/}
        <div className="col-lg-7 col-md-8">
          <div className="caption text-left">
            <h3>{title}</h3>
            <p>{description}</p>
          </div>
        </div>

        {/* Image part*/}
        <div className="col-lg-5 col-md-4 bg-danger d-flex justify-content-center align-items-center">
          <div className="img-container p-3">
            <p>Soraaaaaaaaaaa</p>
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
