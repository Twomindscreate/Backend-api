// hooks/useTeamCRUD.js
import { useDispatch, useSelector } from "react-redux";
import {
  createTeam,
  fetchTeams,
  updateTeam,
  deleteTeam,
} from "../../store/Team/teamSlice";

const useTeamCRUD = () => {
  const dispatch = useDispatch();
  const teamState = useSelector((state) => state.team);

  // Create a new team
  const handleCreateTeam = (teamData) => {
    dispatch(createTeam(teamData));
  };

  // Fetch all teams
  const handleFetchTeams = () => {
    dispatch(fetchTeams());
  };

  // Update a team
  const handleUpdateTeam = (id, teamData) => {
    dispatch(updateTeam({ id, teamData }));
  };

  // Delete a team
  const handleDeleteTeam = (id) => {
    dispatch(deleteTeam(id));
  };

  return {
    ...teamState,
    handleCreateTeam,
    handleFetchTeams,
    handleUpdateTeam,
    handleDeleteTeam,
  };
};

export default useTeamCRUD;
