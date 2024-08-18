import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AxiosInstance from "../../Api/AxiosInstance";
import { toast } from "react-toastify";

// Create team API call
export const createTeam = createAsyncThunk(
  "team/createTeam",
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

// Update team API call
export const updateTeam = createAsyncThunk(
  "team/updateTeam",
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

// Fetch teams API call
export const fetchTeam = createAsyncThunk(
  "team/fetchTeam",
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

// Delete team API call
export const deleteTeam = createAsyncThunk(
  "team/deleteTeam",
  async (teamId, { rejectWithValue }) => {
    try {
      await AxiosInstance.delete(`teams/${teamId}/`);
      toast.success("Team deleted successfully");
      return teamId;
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
    team: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Create team
      .addCase(createTeam.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTeam.fulfilled, (state, action) => {
        state.loading = false;
        state.team = [...state.team, action.payload];
        state.error = null;
      })
      .addCase(createTeam.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update team
      .addCase(updateTeam.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTeam.fulfilled, (state, action) => {
        state.loading = false;
        state.team = state.team.map((team) =>
          team.id === action.payload.id ? action.payload : team
        );
        state.error = null;
      })
      .addCase(updateTeam.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch teams
      .addCase(fetchTeam.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTeam.fulfilled, (state, action) => {
        state.loading = false;
        state.team = action.payload;
        state.error = null;
      })
      .addCase(fetchTeam.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete team
      .addCase(deleteTeam.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTeam.fulfilled, (state, action) => {
        state.loading = false;
        state.team = state.team.filter((team) => team.id !== action.payload);
        state.error = null;
      })
      .addCase(deleteTeam.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default teamSlice.reducer;
