import React from "react";

const AddMembers = () => {
  return (
    <div className="make-center">
      <h1>Add Members</h1>
      <form action="">
        <label htmlFor="members">Select Members:</label>
        <select name="members" id="members">
          <option value="">Select Member</option>
          {/* Add member options here */}
        </select>
        <button type="submit">Add Member</button>
      </form>
    </div>
  );
};

export default AddMembers;
