import { useState, useEffect } from "react";
import { getMembers } from "../api/userService";

export const useMembers = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMembers = async () => {
    setLoading(true);
    try {
      const response = await getMembers();
      setMembers(response.data);
    } catch (err) {
      setError(err.message || "Failed to fetch members");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  return { members, loading, error, fetchMembers };
};

export const useMember = (id) => {
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMember = async (id) => {
    setLoading(true);
    try {
      const response = await getMembers(); // Adjust if API provides endpoint for single member
      const foundMember = response.data.find((member) => member.id === id);
      setMember(foundMember);
    } catch (err) {
      setError(err.message || "Failed to fetch member");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchMember(id);
  }, [id]);

  return { member, loading, error, fetchMember };
};
