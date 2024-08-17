import { useDispatch, useSelector } from "react-redux";

import {
  fetchTeam,
  createTeam,
  updateTeam,
  deleteTeam,
} from "../../store/Team/teamSlice";

const useTeamCRUD = () => {
  const dispatch = useDispatch();
  const teamState = useSelector((state) => state.team);

  // Create team
  const handleCreateTEam = (teamData) => {
    dispatch(createTeam(teamData));
  };

  // Fetch team by
  const handleFetchTeam = (id) => {
    dispatch(fetchTeam(id));
  };

  // Update team
  const handleUpdateTeam = (id, teamData) => {
    dispatch(updateTeam({ id, teamData }));
  };

  // Delete team
  const handleDeleteTeam = (id) => {
    dispatch(deleteTeam(id));
  };

  return {
    ...teamState,
    handleCreateTEam,
    handleFetchTeam,
    handleUpdateTeam,
    handleDeleteTeam,
  };
};

export default useTeamCRUD;
