import "./PrimaryButton.scss";

const PrimaryButton = ({ text, handleClick }) => {
  return (
    <button className="btn-primary button" onClick={handleClick}>
      {text}
    </button>
  );
};

export default PrimaryButton;
