// import React, { useEffect } from "react";
// import AxiosInstance from "../../Api/AxiosInstance";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";

// const Dashboard = () => {
//   const jwt = localStorage.getItem("token");
//   const navigate = useNavigate();

//   // Use the correct JSON.parse instead of json.parse
//   const user = JSON.parse(localStorage.getItem("user"));

//   useEffect(() => {
//     if (!jwt) {
//       navigate("/login");
//     } else {
//       getData();
//     }
//   }, [jwt, user]);

//   const getData = async () => {
//     try {
//       const response = await AxiosInstance.get("get-something/");
//       // Handle the response as needed
//     } catch (error) {
//       console.error("Failed to fetch data", error);
//     }
//   };

//   const refresh = JSON.parse(localStorage.getItem("refresh_token"));

//   const handleLogout = async () => {
//     try {
//       const response = await AxiosInstance.post("logout/", {
//         refresh_token: refresh,
//       });

//       if (response.status === 200) {
//         localStorage.removeItem("token");
//         localStorage.removeItem("refresh_token");
//         localStorage.removeItem("user");
//         navigate("/login");
//         toast.warn("Logout successful");
//       }
//     } catch (error) {
//       console.error("Logout failed", error);
//       toast.error("Failed to logout");
//     }
//   };

//   return (
//     <div>
//       <h1>Dashboard</h1>
//       <h2>Welcome {user?.full_name}</h2>
//       <button onClick={handleLogout}>Logout</button>
//     </div>
//   );
// };

// export default Dashboard;

import React, { useEffect } from "react";
import AxiosInstance from "../../Api/AxiosInstance";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const jwt = localStorage.getItem("token");
  const navigate = useNavigate();

  // Use a try-catch block for JSON parsing
  const getUserFromLocalStorage = () => {
    try {
      const user = localStorage.getItem("user");
      return user ? JSON.parse(user) : null;
    } catch (error) {
      console.error("Error parsing user data:", error);
      return null;
    }
  };

  const user = getUserFromLocalStorage();

  useEffect(() => {
    if (!jwt) {
      navigate("/login");
    } else {
      getData();
    }
  }, [jwt, navigate]);

  const getData = async () => {
    try {
      await AxiosInstance.get("get-something/");
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleLogout = async () => {
    const refresh = localStorage.getItem("refresh_token");

    try {
      const response = await AxiosInstance.post("logout/", {
        refresh_token: refresh,
      });

      if (response.status === 200) {
        localStorage.removeItem("token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("user");
        navigate("/login");
        toast.warn("Logout successful");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <h2>Welcome {user?.full_name}</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
