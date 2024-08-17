import { useDispatch } from "react-redux";
import { useState } from "react";
import { loginUser } from "../../store/auth/authSlice"; // Adjust import based on your actual setup
import AxiosInstance from "../../Api/AxiosInstance";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const useLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleOnChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await AxiosInstance.post("login/", loginData);

      if (response.status === 200) {
        const { access_token, refresh_token, full_name, email } = response.data;

        localStorage.setItem("token", JSON.stringify(access_token));
        localStorage.setItem("refresh_token", JSON.stringify(refresh_token));

        // Optionally update the Redux store if needed
        dispatch(loginUser({ full_name, email }));

        navigate("/dashboard");
        toast.success("Login successful");
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return {
    handleOnChange,
    handleOnSubmit,
    loading,
    loginData,
  };
};

export default useLogin;
