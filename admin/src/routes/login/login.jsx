import React from "react";

import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import apiRequest from "../../lib/apiRequest";
import "./login.scss";

function Login() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { updateUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    const formData = new FormData(e.target);

    const username = formData.get("username");
    const password = formData.get("password");

    try {
      const res = await apiRequest.post("/auth/admin-login", {
        username,
        password,
      });

      updateUser(res.data);

      navigate("/posts");
    } catch (error) {
      setError(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Welcome back</h1>
          <input
            name="username"
            required
            min={3}
            max={20}
            type="text"
            placeholder="Username"
          />
          <input
            name="password"
            required
            type="password"
            placeholder="Password"
          />
          <button>Login</button>
          {error && <span>{error}</span>}
        </form>
      </div>
      <div className="imgContainer">{/* <img src="/bg.png" alt="" /> */}</div>
    </div>
  );
}

export default Login;
