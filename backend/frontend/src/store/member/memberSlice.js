import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AxiosInstance from "../../Api/AxiosInstance";
import { toast } from "react-toastify";

// Create Member api call
export const createMember = createAsyncThunk(
  "members/createMember",
  async ({ memberData }, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.post("members/", memberData);
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
export const updateMember = createAsyncThunk(
  "members/updateTeam",
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
export const fetchMember = createAsyncThunk(
  "members/fetchMembers",
  async ({ rejectWithValue }) => {
    try {
      const response = await AxiosInstance.get("members/");
      return response.data;
    } catch (err) {
      const error = err.response ? err.response.data : "Error Fetching Members";
      toast.error(error);
      return rejectWithValue(err);
    }
  }
);

// delete member api call

export const deleteMember = createAsyncThunk(
  "members/deleteMenber",
  async (memberID, { rejectWithValue }) => {
    try {
      await AxiosInstance.delete("members/${mrmberData.id}");
      toast.success("Member deleted successfully");
      return memberID;
    } catch (err) {
      const error = err.response ? err.response.data : "Error Deleting Member";
      toast.error(error);
      return rejectWithValue(err);
    }
  }
);

const memberSlice = createSlice({
  name: "member",
  initialState: {
    members: null,
    loading: false,
    error: null,
  },

  reducers: {},
  extraReducers: (builder) => {
    builder

      // create members/
      .addCase(createMember.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(createMember.fulfilled, (state, action) => {
        state.loading = false;
        state.members = action.payload;
        state.error = null;
      })

      .addCase(createMember.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // update members

      .addCase(updateMember.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateMember.fulfilled, (state, action) => {
        state.loading = false;
        state.members = action.payload;
        state.error = null;
      })

      .addCase(updateMember.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // fetch members
      .addCase(fetchMember.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchMember.fulfilled, (state, action) => {
        state.loading = false;
        state.members = action.payload;
        state.error = null;
      })

      .addCase(fetchMember.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // delete members
      .addCase(deleteMember.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(deleteMember.fulfilled, (state, action) => {
        state.loading = false;
        state.member = state.member.filter(
          (member) => member.id !== action.payload
        );
        state.error = null;
      })

      .addCase(deleteMember.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default memberSlice.reducer;
