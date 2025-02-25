import noDataImg from "../../../assets/Images/Nodata.png";

export default function NoData() {
  return (
    <div className="d-flex justify-content-center align-items-center">
      <img src={noDataImg} alt="No Data" className="img-fluid" />
    </div>
  );
}
