import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import AxiosInstance from "../../Api/AxiosInstance";
import { toast } from "react-toastify";

import {
  createTeam,
  fetchTeam,
  updateTeam,
  deleteTeam,
} from "../../store/Team/teamSlice";

const useTeamCRUD = () => {
  const dispatch = useDispatch();
  const teamState = useSelector((state) => state.team);
  const [loading, setLoading] = useState(false);
  const [teamData, setTeamData] = useState({
    name: "",
    description: "",
  });
  const [teamId, setTeamId] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTeamData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCreateTeam = async () => {
    setLoading(true);
    try {
      const response = await AxiosInstance.post("teams/", teamData);
      if (response.status === 201) {
        dispatch(createTeam(response.data));
        toast.success("Team created successfully");
      } else {
        toast.error("Failed to create team");
      }
    } catch (error) {
      console.error("Create team failed:", error);
      toast.error("Create team failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateTeam = async () => {
    if (!teamId) {
      toast.error("Team ID is missing");
      return;
    }

    setLoading(true);
    try {
      const response = await AxiosInstance.put(`teams/${teamId}/`, teamData);
      if (response.status === 200) {
        dispatch(updateTeam({ id: teamId, teamData: response.data }));
        toast.success("Team updated successfully");
      } else {
        toast.error("Failed to update team");
      }
    } catch (error) {
      console.error("Update team failed:", error);
      toast.error("Update team failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleFetchTeam = async () => {
    setLoading(true);
    try {
      const response = await AxiosInstance.get(`teams/`);
      if (response.status === 200) {
        dispatch(fetchTeam(response.data));
      } else {
        toast.error("Failed to fetch team");
      }
    } catch (error) {
      console.error("Fetch team failed:", error);
      toast.error("Fetch team failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTeam = async (id) => {
    if (!id) {
      toast.error("Team ID is missing");
      return;
    }

    setLoading(true);
    try {
      const response = await AxiosInstance.delete(`teams/${id}/`);
      if (response.status === 204) {
        dispatch(deleteTeam(id));
        toast.success("Team deleted successfully");
      } else {
        toast.error("Failed to delete team");
      }
    } catch (error) {
      console.error("Delete team failed:", error);
      toast.error("Delete team failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return {
    ...teamState,
    handleCreateTeam,
    handleFetchTeam,
    handleUpdateTeam,
    handleDeleteTeam,
    handleInputChange,
    teamData,
    teamId,
    setTeamId,
    loading,
  };
};

export default useTeamCRUD;
