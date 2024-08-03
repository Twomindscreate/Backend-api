import { useState } from "react";
import { deleteTeam } from "../api/userService";

export const useDeleteTeam = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteExistingTeam = async (id) => {
    setLoading(true);
    try {
      await deleteTeam(id);
      setLoading(false);
      setError(null);
    } catch (err) {
      setError(err.message || "Failed to delete team");
      setLoading(false);
    }
  };

  return { deleteExistingTeam, loading, error };
};
