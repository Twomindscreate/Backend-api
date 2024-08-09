// import React, { useState } from "react";
// import AxiosInstance from "../../Api/AxiosInstance";
// import { toast } from "react-toastify";
// import { useNavigate, useParams } from "react-router-dom";

// const ResetPassword = () => {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [newPasswords, setNewPasswords] = useState({
//     password: "",
//     password2: "",
//   });
//   const navigate = useNavigate();

//   const { uid, token } = useParams();

//   const { password, password2 } = newPasswords;

//   const handleOnChange = (e) => {
//     setNewPasswords({ ...newPasswords, [e.target.name]: e.target.value });
//   };

//   const handleOnSubmit = async (e) => {
//     e.preventDefault();

//     if (password !== password2) {
//       toast.error("Passwords do not match");
//       return;
//     }
//     if (password === "" || password2 === "") {
//       toast.error("Password cannot be empty");
//       return;
//     }
//     if (password.length < 6) {
//       toast.error("Password must be at least 6 characters");
//       return;
//     }

//     const data = {
//       password,
//       password2,
//       uidb64: uid,
//       token,
//     };

//     setLoading(true);

//     try {
//       const response = await AxiosInstance.post("set-new-password/", data);
//       if (response.status === 200) {
//         toast.success(
//           response.data.message || "Password reset successful, Please login"
//         );
//         setLoading(false);
//         setNewPasswords({ password: "", password2: "" }); // Reset form
//         navigate("/login");
//       }
//     } catch (error) {
//       setLoading(false); // Ensure loading is stopped immediately after the error is caught
//       setError(
//         error.response?.data?.message || "An error occurred. Please try again."
//       );
//       toast.error(
//         error.response?.data?.message || "An error occurred. Please try again."
//       );
//     }
//   };

//   return (
//     <div>
//       <div className="container">
//         <h1>Enter Your New Password</h1>
//         {error && <p style={{ color: "red" }}>{error}</p>}
//         <form onSubmit={handleOnSubmit}>
//           <label htmlFor="password">New Password</label>
//           <input
//             placeholder="New Password"
//             type="password"
//             className="glowing-input"
//             name="password"
//             value={password}
//             onChange={handleOnChange}
//             required
//           />
//           <label htmlFor="password2">Confirm New Password</label>
//           <input
//             placeholder="Confirm Password"
//             type="password"
//             className="glowing-input"
//             name="password2"
//             value={password2}
//             onChange={handleOnChange}
//             required
//           />
//           <button type="submit" className="btn btn-primary">
//             {loading ? "Resetting..." : "Reset"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ResetPassword;
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AxiosInstance from "../../Api/AxiosInstance";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { uid, token } = useParams();
  const [newpasswords, setNewPassword] = useState({
    password: "",
    confirm_password: "",
  });
  const { password, confirm_password } = newpasswords;

  const handleChange = (e) => {
    setNewPassword({ ...newpasswords, [e.target.name]: e.target.value });
  };

  const data = {
    password: password,
    confirm_password: confirm_password,
    uidb64: uid,
    token: token,
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (data) {
      const res = await AxiosInstance.patch("set-new-password/", data);
      const response = res.data;
      if (res.status === 200) {
        navigate("/login");
        toast.success(response.message);
      }
      console.log(response);
    }
  };
  return (
    <div>
      <div className="form-container">
        <div className="wrapper" style={{ width: "100%" }}>
          <h2>Enter your New Password</h2>
          <form action="" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="">New Password:</label>
              <input
                type="text"
                className="email-form"
                name="password"
                value={password}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="">Confirm Password</label>
              <input
                type="text"
                className="email-form"
                name="confirm_password"
                value={confirm_password}
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="vbtn">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
