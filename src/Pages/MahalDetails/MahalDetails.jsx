import "./MahalDetails.scss";
import DetailsCard from "../../Components/DetailsCard/DetailsCard";
import { useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { userReq } from "../../requestMethods";
import PrimaryButton from "../../Components/PrimaryButton/PrimaryButton";

const MahalDetails = () => {
  const [data, setData] = useState({});
  const location = useLocation();
  const id = location.pathname.split("/")[3];
  const formRef = useRef();

  useEffect(() => {
    const getDetails = async () => {
      try {
        const details = await userReq.get(`/mahal/view/${id}`);
        setData(details.data.data.data.mahalDetails[0]);
      } catch (err) {
        console.log(err);
      }
    };
    getDetails();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    let fData = Object.fromEntries(formData.entries());

    try {
      Object.keys(fData).forEach((key) => {
        if (fData[key] === "") {
          delete fData[key];
        }
      });

      const result = await userReq.put(`/mahal/update/${id}`, fData);
      result.data.data.data && window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="mahal-details default">
      <h2 className="header section-header">Mahallu details</h2>
      <DetailsCard member={data} />
      <h2 className="header section-header">update mahal details</h2>
      <form action="" className="mahal-form" onSubmit={handleSubmit}>
        <p className="text-regular mahal-form-text">
          **fill in the field you want to update
        </p>
        {Object.keys(data).map((label, indx) => (
          <div key={indx}>
            <label className="placeholder">{label}</label>
            <input
              type="text"
              className="input"
              placeholder={label}
              name={label}
              ref={formRef}
            />
          </div>
        ))}
        <PrimaryButton text={"update"} />
      </form>
    </div>
  );
};

export default MahalDetails;
