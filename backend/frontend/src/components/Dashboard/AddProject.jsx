import React from "react";

const AddProject = () => {
  return (
    <div className="make-center">
      <h1>Add Project</h1>
      <form>
        <input type="text" placeholder="Project Name" />
        <input type="text" placeholder="Description" />
        <input type="submit" value="Add Project" />
      </form>
    </div>
  );
};

export default AddProject;
