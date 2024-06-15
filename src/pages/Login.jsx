import { useState } from "react";
import "../css/login.css";
import axios from "axios";

import { links } from "../links";
import { useNavigate } from "react-router-dom";
import { setToken } from "../custom hooks/token";
import { clearSocket } from "../socket.io/socket";


function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  useState(()=> {
    clearSocket();
  })

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function HandleLogIn(formData) {
    try {
      const response = await axios.post(links.logInURI, formData);
      const token = response.data.token;
      setToken(token);
      navigate("/chat");
    } catch (error) {
      console.error(error.response);
      console.error(error);
    }
  }

  return (
    <div className="login-page-container">
      <div className="login-container">
        <h1>Login</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formDataCopy = { ...formData };
            formDataCopy.email = formDataCopy.email.toLowerCase();
            // Logic to send login info
            HandleLogIn(formDataCopy);
          }}
        >
          <div>Email</div>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
          <div>Password</div>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
          <div>
            <button className="login-btn roboto-regular">
              Login
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
          <a href="/signup">don't have an account?</a>
        </form>
      </div>
    </div>
  );
}

export default Login;
