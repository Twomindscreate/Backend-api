import { useState } from 'react';
import {
  fetchTeams,
  createTeam,
  fetchTeamDetail,
  updateTeam,
  deleteTeam,
} from '../api/teamService';

export const useTeam = () => {
  const [teams, setTeams] = useState([]);
  const [team, setTeam] = useState(null);

  const handleFetchTeams = async () => {
    try {
      const response = await fetchTeams();
      setTeams(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateTeam = async (data) => {
    try {
      const response = await createTeam(data);
      setTeams([...teams, response.data]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFetchTeamDetail = async (id) => {
    try {
      const response = await fetchTeamDetail(id);
      setTeam(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateTeam = async (id, data) => {
    try {
      const response = await updateTeam(id, data);
      setTeam(response.data);
      setTeams(teams.map((team) => (team.id === id ? response.data : team)));
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteTeam = async (id) => {
    try {
      await deleteTeam(id);
      setTeams(teams.filter((team) => team.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return {
    teams,
    team,
    handleFetchTeams,
    handleCreateTeam,
    handleFetchTeamDetail,
    handleUpdateTeam,
    handleDeleteTeam,
  };
};