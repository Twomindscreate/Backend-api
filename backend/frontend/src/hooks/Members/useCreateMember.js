import { useState } from "react";
import { createMember } from "../api/userService";

export const useCreateMember = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createNewMember = async (data) => {
    setLoading(true);
    try {
      await createMember(data);
      setLoading(false);
      setError(null);
    } catch (err) {
      setError(err.message || "Failed to create member");
      setLoading(false);
    }
  };

  return { createNewMember, loading, error };
};
