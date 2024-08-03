import { useState, useEffect } from "react";
import { getTeams } from "../api/userService";

export const useTeams = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTeams = async () => {
    setLoading(true);
    try {
      const response = await getTeams();
      setTeams(response.data);
    } catch (err) {
      setError(err.message || "Failed to fetch teams");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  return { teams, loading, error, fetchTeams };
};

export const useTeam = (id) => {
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTeam = async (id) => {
    setLoading(true);
    try {
      const response = await getTeams(); // Adjust if API provides endpoint for single team
      const foundTeam = response.data.find((team) => team.id === id);
      setTeam(foundTeam);
    } catch (err) {
      setError(err.message || "Failed to fetch team");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchTeam(id);
  }, [id]);

  return { team, loading, error, fetchTeam };
};
