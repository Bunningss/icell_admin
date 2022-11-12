import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginFailure, loginStart, loginSuccess } from "../../Redux/userRedux";
import { publicRequest } from "../../requestMethods";
import "./Login.scss";

const Login = () => {
  const [data, setData] = useState({
    UserName: "",
    Password: "",
  });
  const [error, setError] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const result = await publicRequest.post("user/login", data);
      dispatch(loginSuccess(result.data.data));
      navigate("/");
      window.location.reload();
    } catch (err) {
      setError(err.response.data.error.error);
      dispatch(loginFailure());
    }
  };

  return (
    <div className="login default">
      <div className="wrapper">
        <form action="" className="form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter Your Username"
            className="form-input"
            name="UserName"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Enter Your Password"
            className="form-input"
            name="Password"
            onChange={handleChange}
          />
          {error && <p className="error-message">{error}</p>}
          <button className="button">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
