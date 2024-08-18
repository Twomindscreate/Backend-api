import { useDispatch, useSelector } from "react-redux";
import {
  createTask,
  fetchTask,
  updateTask,
  deleteTask,
} from "../../store/Task/TaskSlice";

const useTaskCRUD = () => {
  const dispatch = useDispatch();
  const taskState = useSelector((state) => state.task);

  // Create a new task
  const handleCreateTask = (taskData) => {
    return dispatch(createTask(taskData)).unwrap();
  };

  // Fetch all tasks
  const handleFetchTasks = () => {
    dispatch(fetchTask());
  };

  // Update a task
  const handleUpdateTask = (id, taskData) => {
    return dispatch(updateTask({ id, taskData })).unwrap();
  };

  // Delete a task
  const handleDeleteTask = (id) => {
    return dispatch(deleteTask(id)).unwrap();
  };

  return {
    ...taskState, // Include all state properties (tasks, loading, error, etc.)
    handleCreateTask,
    handleFetchTasks,
    handleUpdateTask,
    handleDeleteTask,
  };
};

export default useTaskCRUD;
