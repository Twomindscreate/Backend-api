import { useState } from "react";
import { deleteMember } from "../api/userService";

export const useDeleteMember = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteExistingMember = async (id) => {
    setLoading(true);
    try {
      await deleteMember(id);
      setLoading(false);
      setError(null);
    } catch (err) {
      setError(err.message || "Failed to delete member");
      setLoading(false);
    }
  };

  return { deleteExistingMember, loading, error };
};
