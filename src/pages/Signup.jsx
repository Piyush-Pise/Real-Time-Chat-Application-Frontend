import axios from "axios";
import { useState } from "react";
import "../css/login.css";
import { useNavigate } from "react-router-dom";
import { links } from "../links";

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function HandleSignUp(formData) {
    try {
      const response = await axios.post(links.signUpURI, formData);
      //   const token = response.data.token;
      //   localStorage.setItem("token", token);
      navigate("/login");
    } catch (error) {
      console.error(error.response.data.msg);
      console.error(error);
    }
  }

  return (
    <div className="login-page-container">
      <div className="login-container">
        <h1>Sign Up</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formDataCopy = { ...formData };
            formDataCopy.email = formDataCopy.email.toLowerCase();

            // Logic to send SignUp info
            HandleSignUp(formDataCopy);
          }}
        >
          <div>Name</div>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            required
          />
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
            <button type="submit" className="login-btn roboto-regular">
              Sign Up
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
          {/* <a href="/sign-up">don't have an account?</a> */}
        </form>
      </div>
    </div>
  );
}

export default Signup;
