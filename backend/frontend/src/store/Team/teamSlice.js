// store/team/teamSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AxiosInstance from "../../Api/AxiosInstance";
import { toast } from "react-toastify";

// Create Team API call
export const createTeam = createAsyncThunk(
  "teams/createTeam",
  async (teamData, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.post("teams/", teamData);
      toast.success("Team created successfully");
      return response.data;
    } catch (err) {
      const error = err.response ? err.response.data : "Error Creating Team";
      toast.error(error);
      return rejectWithValue(error);
    }
  }
);

// Update Team API call
export const updateTeam = createAsyncThunk(
  "teams/updateTeam",
  async ({ id, teamData }, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.put(`teams/${id}/`, teamData);
      toast.success("Team updated successfully");
      return response.data;
    } catch (err) {
      const error = err.response ? err.response.data : "Error Updating Team";
      toast.error(error);
      return rejectWithValue(error);
    }
  }
);

// Fetch Teams API call
export const fetchTeams = createAsyncThunk(
  "teams/fetchTeams",
  async (_, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.get("teams/");
      return response.data;
    } catch (err) {
      const error = err.response ? err.response.data : "Error Fetching Teams";
      toast.error(error);
      return rejectWithValue(error);
    }
  }
);

// Delete Team API call
export const deleteTeam = createAsyncThunk(
  "teams/deleteTeam",
  async (id, { rejectWithValue }) => {
    try {
      await AxiosInstance.delete(`teams/${id}/`);
      toast.success("Team deleted successfully");
      return id;
    } catch (err) {
      const error = err.response ? err.response.data : "Error Deleting Team";
      toast.error(error);
      return rejectWithValue(error);
    }
  }
);

const teamSlice = createSlice({
  name: "team",
  initialState: {
    teams: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createTeam.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTeam.fulfilled, (state, action) => {
        state.loading = false;
        state.teams.push(action.payload);
        state.error = null;
      })
      .addCase(createTeam.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateTeam.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTeam.fulfilled, (state, action) => {
        state.loading = false;
        state.teams = state.teams.map((team) =>
          team.id === action.payload.id ? action.payload : team
        );
        state.error = null;
      })
      .addCase(updateTeam.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchTeams.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTeams.fulfilled, (state, action) => {
        state.loading = false;
        state.teams = action.payload;
        state.error = null;
      })
      .addCase(fetchTeams.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteTeam.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTeam.fulfilled, (state, action) => {
        state.loading = false;
        state.teams = state.teams.filter((team) => team.id !== action.payload);
        state.error = null;
      })
      .addCase(deleteTeam.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default teamSlice.reducer;
