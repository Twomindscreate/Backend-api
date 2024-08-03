import React from "react";

const AddTask = () => {
  return (
    <div className="make-center">
      <h1>Add Task</h1>
      <form action="">
        <label htmlFor="task">Task:</label>
        <input type="text" id="task" name="task" required />
        <input type="submit" value="Add Task" />
      </form>
    </div>
  );
};

export default AddTask;
