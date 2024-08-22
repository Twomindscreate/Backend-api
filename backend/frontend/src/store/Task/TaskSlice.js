import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AxiosInstance from "../../Api/AxiosInstance";
import { toast } from "react-toastify";

// Create Task API call
export const createTask = createAsyncThunk(
  "tasks/createTask",
  async (taskData, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.post("tasks/", taskData);
      toast.success("Task created successfully");
      return response.data;
    } catch (err) {
      const error = err.response ? err.response.data : "Error Creating Task";
      toast.error(error);
      return rejectWithValue(error);
    }
  }
);

// Update Task API call
export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async ({ id, taskData }, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.put(`tasks/${id}/`, taskData);
      toast.success("Task updated successfully");
      return response.data;
    } catch (err) {
      const error = err.response ? err.response.data : "Error Updating Task";
      toast.error(error);
      return rejectWithValue(error);
    }
  }
);

// Fetch Task API call
export const fetchTask = createAsyncThunk(
  "tasks/fetchTask",
  async (_, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.get("tasks/");
      return response.data;
    } catch (err) {
      const error = err.response ? err.response.data : "Error Fetching Tasks";
      toast.error(error);
      return rejectWithValue(error);
    }
  }
);

// Delete Task API call
export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (id, { rejectWithValue }) => {
    try {
      await AxiosInstance.delete(`tasks/${id}/`);
      toast.success("Task deleted successfully");
      return id;
    } catch (err) {
      const error = err.response ? err.response.data : "Error Deleting Task";
      toast.error(error);
      return rejectWithValue(error);
    }
  }
);

export const fetchMembers = createAsyncThunk(
  "menbers/fetchMembers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.get("members/");
      return response.data;
    } catch (err) {
      const error = err.response ? err.response.data : "Error Fetching Members";
      toast.error(error);
      return rejectWithValue(error);
    }
  }
);

const taskSlice = createSlice({
  name: "task",
  initialState: {
    tasks: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks.push(action.payload);
        state.error = null;
      })
      .addCase(createTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = state.tasks.map((task) =>
          task.id === action.payload.id ? action.payload : task
        );
        state.error = null;
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
        state.error = null;
      })
      .addCase(fetchTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
        state.error = null;
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchMembers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchMembers.fulfilled, (state, action) => {
        state.loading = false;
        state.members = action.payload;
        state.error = null;
      })
      .addCase(fetchMembers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default taskSlice.reducer;
