import { useEffect, useState } from "react";
import AxiosInstance from "../../Api/AxiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, reset } from "../../store/Slice/auth/authSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const useLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const [loading, setLoading] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleOnChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    isSuccess && navigate("/dashboard");
  }, [isSuccess]);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    // dispatch(login(loginData));
    setLoading(true);

    try {
      const { status, data } = await AxiosInstance.post("login/", loginData);
      if (status === 200) {
        localStorage.setItem("token", JSON.stringify(data.access_token));
        localStorage.setItem(
          "refresh_token",
          JSON.stringify(data.refresh_token)
        );
        const user = data.full_name;
        localStorage.setItem("user", JSON.stringify(user)); // Save user info
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

  const handleLogout = async () => {
    // dispatch(logout());
    const refresh = JSON.parse(localStorage.getItem("refresh_token"));
    const res = await AxiosInstance.post("logout/", {
      refresh_token: refresh,
    });
    if (res.status === 204) {
      // dispatch(logout());
      // dispatch(reset);
      navigate("/");
      toast.warn("Logout successful");
    }
  };

  return {
    handleOnChange,
    handleOnSubmit,
    handleLogout,
    loading: isLoading,
    loginData,
  };
};

export default useLogin;
