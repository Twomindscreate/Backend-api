import React, { useEffect, useState } from "react";
import useTeamCRUD from "../../hooks/Team/useTeamCRUD"; // Ensure the correct path

const CreateUpdate = () => {
  const {
    teams,
    loading,
    handleCreateTeam,
    handleUpdateTeam,
    handleDeleteTeam,
    handleFetchTeam,
    handleInputChange,
    teamData,
    setTeamData,
    teamId,
    setTeamId,
  } = useTeamCRUD();

  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    handleFetchTeam(); // Fetch teams on initial load
  }, [handleFetchTeam]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editMode) {
      handleUpdateTeam();
    } else {
      handleCreateTeam();
    }
    setEditMode(false); // Reset edit mode after submit
    setTeamData({ name: "", description: "" }); // Clear form data
  };

  const handleEditClick = (team) => {
    setTeamId(team.id);
    setTeamData({ name: team.name, description: team.description });
    setEditMode(true);
  };

  const handleDeleteClick = (id) => {
    if (window.confirm("Are you sure you want to delete this team?")) {
      handleDeleteTeam(id);
    }
  };

  return (
    <div className="team-management">
      <h1>Team Management</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={teamData.name}
          onChange={handleInputChange}
          placeholder="Team Name"
          required
        />
        <input
          type="text"
          name="description"
          value={teamData.description}
          onChange={handleInputChange}
          placeholder="Description"
          required
        />
        <button type="submit" disabled={loading}>
          {editMode ? "Update Team" : "Create Team"}
        </button>
      </form>

      {loading && <p>Loading...</p>}

      <table>
        <thead>
          <tr>
            <th>Team Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {teams && teams.length > 0 ? (
            teams.map((team) => (
              <tr key={team.id}>
                <td>{team.name}</td>
                <td>{team.description}</td>
                <td>
                  <button onClick={() => handleEditClick(team)}>Update</button>
                  <button onClick={() => handleDeleteClick(team.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No teams available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CreateUpdate;
