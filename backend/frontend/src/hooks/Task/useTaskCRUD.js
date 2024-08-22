import { useDispatch, useSelector } from "react-redux";
import {
  createTask,
  fetchTask,
  updateTask,
  deleteTask,
  fetchMembers,
} from "../../store/Task/TaskSlice";

const useTaskCRUD = () => {
  const dispatch = useDispatch();
  const { tasks, loading, error, members } = useSelector((state) => state.task);

  // Create a new task
  const handleCreateTask = async (taskData) => {
    try {
      await dispatch(createTask(taskData)).unwrap();
    } catch (err) {
      console.error("Error creating task:", err);
    }
  };

  // Fetch all tasks
  const handleFetchTasks = async () => {
    try {
      await dispatch(fetchTask()).unwrap();
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };
  // Update a task
  const handleUpdateTask = async (id, taskData) => {
    try {
      await dispatch(updateTask({ id, taskData })).unwrap();
    } catch (err) {
      console.error("Error updating task:", err);
    }
  };

  // Delete a task
  const handleDeleteTask = async (id) => {
    try {
      await dispatch(deleteTask(id)).unwrap();
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  //fetch Members
  const handleFetchMembers = async () => {
    try {
      await dispatch(fetchMembers()).unwrap();
    } catch (err) {
      console.error("Error fetching members:", err);
    }
  };

  return {
    tasks,
    loading,
    error,
    members,
    handleCreateTask,
    handleFetchTasks,
    handleUpdateTask,
    handleDeleteTask,
    handleFetchMembers,
  };
};

export default useTaskCRUD;
