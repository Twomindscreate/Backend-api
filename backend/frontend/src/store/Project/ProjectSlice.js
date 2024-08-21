import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AxiosInstance from "../../Api/AxiosInstance";
import { toast } from "react-toastify";

// Create Project api call
export const createProject = createAsyncThunk(
  "projects/createProject",

  async (projectData, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.post("projects/", projectData);
      toast.success("Project created successfully..!");
      return response.data;
    } catch (err) {
      const error = err.response ? err.response.data : "Error creating project";
      toast.error(error);
      return rejectWithValue(error);
    }
  }
);

// Update Project API call

export const updateProject = createAsyncThunk(
  "projects/updateProject",

  async ({ id, projectData }, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.put(`projects/${id}/`, projectData);
      toast.success("Project updated successfully..!");
      return response.data;
    } catch (err) {
      const error = err.response ? err.response.data : "Error updating project";
      toast.error(error);
      return rejectWithValue(error);
    }
  }
);

// Fetch project api call
export const fetchProjects = createAsyncThunk(
  "projects/fetchProjects",
  async (_, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.get("projects/");
      return response.data;
    } catch (err) {
      const error = err.response
        ? err.response.data
        : "Error fetching projects";
      toast.error(error);
      return rejectWithValue(error);
    }
  }
);

// Delete Project API call

export const deleteProject = createAsyncThunk(
  "projects/deleteProject",

  async (id, { rejectWithValue }) => {
    try {
      await AxiosInstance.delete(`projects/${id}/`);
      toast.success("Project deleted successfully..!");
      return id;
    } catch (err) {
      const error = err.response ? err.response.data : "Error deleting project";
      toast.error(error);
      return rejectWithValue(error);
    }
  }
);

const projectSlice = createSlice({
  name: "project",
  initialState: {
    projects: [],
    loading: false,
    error: null,
  },
  reducers: {
    extraReducers: (builder) => {
      builder

        .addCase(createProject.pending, (state) => {
          state.loading = true;
          state.error = null;
        })

        .addCase(createProject.fulfilled, (state, action) => {
          state.loading = false;
          state.projects.push(action.payload);
          state.error = null;
        })

        .addCase(createProject.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })

        .addCase(updateProject.pending, (state) => {
          state.loading = true;
          state.error = null;
        })

        .addCase(updateProject.fulfilled, (state, action) => {
          state.loading = false;
          state.projects = state.projects.map((project) =>
            project.id === action.payload.id ? action.payload : project
          );
          state.error = null;
        })

        .addCase(updateProject.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })

        .addCase(fetchProjects.pending, (state) => {
          state.loading = true;
          state.error = null;
        })

        .addCase(fetchProjects.fulfilled, (state, action) => {
          state.loading = false;
          state.projects = action.payload;
          state.error = null;
        })

        .addCase(fetchProjects.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })

        .addCase(deleteProject.pending, (state) => {
          state.loading = true;
          state.error = null;
        })

        .addCase(deleteProject.fulfilled, (state, action) => {
          state.loading = false;
          state.projects = state.projects.filter(
            (project) => project.id !== action.payload
          );
          state.error = null;
        })

        .addCase(deleteProject.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
    },
  },
});

export default projectSlice.reducer;
