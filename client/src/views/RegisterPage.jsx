import React, { useState } from "react";
import "../App.css";
import { useDispatch } from "react-redux";
import { login, register } from "../stores/actions/action";
import { useNavigate, useNavigation } from "react-router-dom";
import Swal from "sweetalert2";

const RegisterPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const logins = await dispatch(register(formData, navigate));
      //   await navigate("/");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.message,
      });
      //   console.log(error.response.data.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Register</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>
          <button type="submit">Register</button>
        </form>
        <p>
          have an account? <strong>Sign In</strong>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
