import React, { useEffect } from 'react';
import { Table, Button } from 'reactstrap';
import { useTask } from '../../hooks/useTask';
import { Link } from 'react-router-dom';

const TaskList = () => {
  const { tasks, handleFetchTasks, handleDeleteTask } = useTask();

  useEffect(() => {
    handleFetchTasks();
  }, []);

  return (
    <div className="task-list">
      <h2>Tasks</h2>
      <Table striped>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td>{task.status}</td>
              <td>
                <Link to={/task/${task.id}} className="btn btn-info">
                  Details
                </Link>
                <Button color="danger" onClick={() => handleDeleteTask(task.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Link to="/task/create" className="btn btn-primary">
        Create Task
      </Link>
    </div>
  );
};

export default TaskList;