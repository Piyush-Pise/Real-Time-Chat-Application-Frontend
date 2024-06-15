import { useEffect } from "react";
import { getToken } from "../custom hooks/token";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { links } from "../links";

function Temporary() {
  const navigate = useNavigate();

  async function verifyToken() {
    try {
      const token = getToken();
      if (!token) {
        navigate("/login");
      }
      axios.defaults.headers.common["x-auth-token"] = token;
      const res = await axios.get(links.VerifyTokenURI);
      if (res.status === 200) {
        navigate("/chat");
      }
      navigate("/login");
    } catch (error) {
      console.error(error);
      navigate("/login");
    }
  }

  useEffect(() => {
    verifyToken();
  });

  return <>Loading...</>;
}

export default Temporary;
