import { useState } from "react";
import { updateTeam } from "../api/userService";

export const useUpdateTeam = (id) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateExistingTeam = async (data) => {
    setLoading(true);
    try {
      await updateTeam(id, data);
      setLoading(false);
      setError(null);
    } catch (err) {
      setError(err.message || "Failed to update team");
      setLoading(false);
    }
  };

  return { updateExistingTeam, loading, error };
};
