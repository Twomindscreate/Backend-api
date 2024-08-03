import { useState } from "react";
import { updateMember } from "../api/userService";

export const useUpdateMember = (id) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateExistingMember = async (data) => {
    setLoading(true);
    try {
      await updateMember(id, data);
      setLoading(false);
      setError(null);
    } catch (err) {
      setError(err.message || "Failed to update member");
      setLoading(false);
    }
  };

  return { updateExistingMember, loading, error };
};
