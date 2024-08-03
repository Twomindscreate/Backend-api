import React from "react";

const AddTeams = () => {
  return (
    <div className="make-center">
      <h1>Add Teams</h1>
      <form action="">
        <label htmlFor="teamName">Team Name:</label>
        <input type="text" id="teamName" name="teamName" required />
        <label htmlFor="teamDescription">Team Description:</label>
        <textarea id="teamDescription" name="teamDescription" required />
        <button type="submit">Add Team</button>
      </form>
    </div>
  );
};

export default AddTeams;
