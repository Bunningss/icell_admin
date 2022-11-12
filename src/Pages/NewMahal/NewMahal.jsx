import "./NewMahal.scss";
import FormInput from "../../Components/FormInput/FormInput";
import PrimaryButton from "../../Components/PrimaryButton/PrimaryButton";
import { useState } from "react";
import { userReq } from "../../requestMethods";

const NewMahal = () => {
  const [data, setData] = useState({
    MahalluName: "",
    MosqueName: "",
    MahalluVillage: "",
    MahalluThalook: "",
    MahalluDistrict: "",
    State: "",
    PresidentName: "",
    PresidentEmail: "",
    PresidentPhone: "",
    SecretaryName: "",
    SecretaryEmail: "",
    SecretaryPhone: "",
    TreasurerName: "",
    TreasurerEmail: "",
    TreasurerPhone: "",
  });
  const [error, setError] = useState("");

  const inputs = [
    {
      name: "MahalluName",
      type: "text",
      placeholder: "Mahallu Name",
      required: true,
      minLength: 3,
      errorMsg: "Enter Mahallu Name",
    },
    {
      name: "MosqueName",
      type: "text",
      placeholder: "Mosque Name",
      required: true,
      minLength: 3,
      errorMsg: "Enter Mahallu Name",
    },
    {
      name: "MahalluVillage",
      type: "text",
      placeholder: "Mahallu Village",
      required: true,
      minLength: 3,
      errorMsg: "Enter Mahallu Village Name",
    },
    {
      name: "MahalluThalook",
      type: "text",
      placeholder: "Mahallu Thalook",
      required: true,
      minLength: 3,
      errorMsg: "Enter Mahallu Thalook",
    },
    {
      name: "MahalluDistrict",
      type: "text",
      placeholder: "Mahallu District",
      required: true,
      minLength: 3,
      errorMsg: "Enter Mahallu District Name",
    },
    {
      name: "State",
      type: "text",
      placeholder: "State Name",
      required: true,
      minLength: 3,
      errorMsg: "Enter State Name",
    },
    {
      name: "PresidentName",
      type: "text",
      placeholder: "President Name",
      required: true,
      minLength: 3,
      errorMsg: "Enter President Name",
    },
    {
      name: "PresidentEmail",
      type: "email",
      placeholder: "President Email",
      required: true,
      minLength: 3,
      errorMsg: "Enter President Email",
    },
    {
      name: "PresidentPhone",
      type: "number",
      placeholder: "President Number",
      required: true,
      minLength: 5,
      min: 1,
      errorMsg: "Enter President Number",
    },
    {
      name: "SecretaryName",
      type: "text",
      placeholder: "Secretary Name",
      required: true,
      minLength: 3,
      errorMsg: "Enter Secretary Name",
    },
    {
      name: "SecretaryEmail",
      type: "email",
      placeholder: "Secretary Email",
      required: true,
      minLength: 3,
      errorMsg: "Enter Secretary Email",
    },
    {
      name: "SecretaryPhone",
      type: "number",
      placeholder: "Secretary Phone",
      required: true,
      minLength: 5,
      min: 1,
      errorMsg: "Enter Secretary Phone",
    },
    {
      name: "TreasurerName",
      type: "text",
      placeholder: "Treasurer Name",
      required: true,
      minLength: 3,
      errorMsg: "Enter Treasurer Name",
    },
    {
      name: "TreasurerEmail",
      type: "email",
      placeholder: "Treasurer Email",
      required: true,
      minLength: 3,
      errorMsg: "Enter Treasurer Email",
    },
    {
      name: "TreasurerPhone",
      type: "number",
      placeholder: "Treasurer Phone",
      required: true,
      minLength: 5,
      min: 1,
      errorMsg: "Enter Treasurer Phone",
    },
  ];
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await userReq.post("/mahal/create", { ...data });
      result.data.data.data && window.location.reload();
    } catch (err) {
      setError(err.response.data.error.error);
    }
  };

  return (
    <div className="new-mahal default">
      <h2 className="header section-header">Add new mahal</h2>
      <form className="wrapper" onSubmit={handleSubmit}>
        {inputs.map((input, indx) => (
          <FormInput input={input} key={indx} handleChange={handleChange} />
        ))}
        {error && <p className="error-message">{error}</p>}
        <PrimaryButton text={"create new mahal"} />
      </form>
    </div>
  );
};

export default NewMahal;
