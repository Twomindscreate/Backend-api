import { createAsyncThunk } from "@reduxjs/toolkit";
import AxiosInstance from "../../Api/AxiosInstance";
import { toast } from "react-toastify";

// Create Member api call
export const createMember = createAsyncThunk(
  "team/createMember",
  async (teamData, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.post("teams/", teamData);
      toast.success("Member created successfully");
      return response.data;
    } catch (err) {
      const error = err.response ? err.response.data : "Error Creating Member";
      toast.error(error);
      return rejectWithValue(error.response.data);
    }
  }
);

// update member api call
export const updateTeam = createAsyncThunk(
  "team/updateTeam",
  async (memberData, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.put(
        `members/${memberData.id}`,
        memberData
      );
      toast.success("Member updated successfully");
      return response.data;
    } catch (err) {
      const error = err.response ? err.response.data : "Error Updating Member";
      toast.error(error);
      return rejectWithValue(error.response.data);
    }
  }
);

// fetch members api call
