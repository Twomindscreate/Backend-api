import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const useRegister = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [registerData, setRegisterData] = useState({
    email: "",
    username: "",
    password: "",
    password2: "",
  });
  const [error, setError] = useState(" ");

  const handleOnChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:8000/api/register/",
        registerData
      );
      if (response.status === 201) {
        navigate("/otp/verify");
        toast.success("Registration successful, Please login");
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data);
        setLoading(false);
      }
    }
  };

  return {
    handleOnChange,
    handleOnSubmit,
    loading,
    registerData,
  };
};

export default useRegister;
