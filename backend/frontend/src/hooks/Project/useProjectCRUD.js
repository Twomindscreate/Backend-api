import { useDispatch, useSelector } from "react-redux";
import {
  createProject,
  fetchProjects,
  updateProject,
  deleteProject,
} from "../../store/Project/ProjectSlice";

const useProjectCRUD = () => {
  const dispatch = useDispatch();
  const { projects, loading, error } = useSelector((state) => state.project);

  // Create new project
  const handleCreateProject = async (projectData) => {
    try {
      await dispatch(createProject(projectData)).unwrap();
    } catch (err) {
      console.error("Error creating project:", err);
    }
  };

  //Fetch all projects
  const handleFetchProjects = async () => {
    try {
      await dispatch(fetchProjects()).unwrap();
    } catch (err) {
      console.error("Error fetching projects:", err);
    }
  };

  // Update a project
  const handleUpdateProject = async (id, projectData) => {
    try {
      await dispatch(updateProject({ id, projectData })).unwrap();
    } catch (err) {
      console.error("Error updating project:", err);
    }
  };

  // Delete a project
  const handleDeleteProject = async (id) => {
    try {
      await dispatch(deleteProject(id)).unwrap();
    } catch (err) {
      console.error("Error deleting project:", err);
    }
  };

  return {
    projects,
    loading,
    error,
    handleCreateProject,
    handleFetchProjects,
    handleUpdateProject,
    handleDeleteProject,
  };
};

export default useProjectCRUD;
