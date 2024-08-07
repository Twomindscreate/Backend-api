// import { useState } from "react";
// import { createTeam } from "../api/userService";

// export const useCreateTeam = () => {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const createNewTeam = async (data) => {
//     setLoading(true);
//     try {
//       await createTeam(data);
//       setLoading(false);
//       setError(null);
//     } catch (err) {
//       setError(err.message || "Failed to create team");
//       setLoading(false);
//     }
//   };

//   return { createNewTeam, loading, error };
// };
import { useState } from "react";
import { createTeam } from "../api/userService";

export const useCreateTeam = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createNewTeam = async (data) => {
    setLoading(true);
    try {
      await createTeam(data);
      setError(null); // Clear any previous errors
    } catch (err) {
      setError(err.message || "Failed to create team");
    } finally {
      setLoading(false);
    }
  };

  return { createNewTeam, loading, error };
};
