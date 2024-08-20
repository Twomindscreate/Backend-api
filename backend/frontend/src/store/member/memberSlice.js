// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import AxiosInstance from "../../Api/AxiosInstance";
// import { toast } from "react-toastify";

// // Create Team Member API call
// export const createMember = createAsyncThunk(
//   "members/createMember",
//   async (memberData, { rejectWithValue }) => {
//     try {
//       const response = await AxiosInstance.post("members/", memberData);
//       toast.success("Member created successfully...!");
//       return response.data;
//     } catch (err) {
//       const error = err.response ? err.response.data : "Error Creating member ";
//       toast.error(error);
//       return rejectWithValue(error);
//     }
//   }
// );

// // Update API call
// export const updateMember = createAsyncThunk(
//   "members/updateMember",
//   async ({ id, memberData }, { rejectWithValue }) => {
//     try {
//       const response = await AxiosInstance.put(`members/${id}/`, memberData);
//       toast.success("Member Updated Successfully...!");
//       return response.data;
//     } catch (err) {
//       const error = err.response ? err.response.data : "Error Updating Member";
//       toast.error(error);
//       return rejectWithValue(error);
//     }
//   }
// );

// // Fetch members API call
// export const fetchMembers = createAsyncThunk(
//   "members/fetchMembers",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await AxiosInstance.get("members/");
//       return response.data;
//     } catch (err) {
//       const error = err.response ? err.response.data : "Error Fetching Members";
//       toast.error(error);
//       return rejectWithValue(error);
//     }
//   }
// );

// // Fetch users api call

// export const fetchUsers = createAsyncThunk(
//   "users/fetchUsers",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await AxiosInstance.get("users/");
//       return response.data;
//     } catch (err) {
//       const error = err.response ? err.response.data : "Error fetching users";
//       toast.error(error);
//       return rejectWithValue(error);
//     }
//   }
// );

// // Delete member API call
// export const deleteMember = createAsyncThunk(
//   "members/deleteMember",
//   async (id, { rejectWithValue }) => {
//     try {
//       await AxiosInstance.delete(`members/${id}/`);
//       toast.success("Member deleted successfully...!");
//       return id;
//     } catch (err) {
//       const error = err.response ? err.response.data : "Error Deleting Member";
//       toast.error(error);
//       return rejectWithValue(error);
//     }
//   }
// );

// const memberSlice = createSlice({
//   name: "member",
//   initialState: {
//     members: [],
//     users: [],
//     loading: false,
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(createMember.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(createMember.fulfilled, (state, action) => {
//         state.loading = false;
//         state.members.push(action.payload);
//         state.error = null;
//       })
//       .addCase(createMember.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       .addCase(updateMember.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(updateMember.fulfilled, (state, action) => {
//         state.loading = false;
//         state.members = state.members.map((member) =>
//           member.id === action.payload.id ? action.payload : member
//         );
//         state.error = null;
//       })
//       .addCase(updateMember.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       .addCase(fetchMembers.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchMembers.fulfilled, (state, action) => {
//         state.loading = false;
//         state.members = action.payload;
//         state.error = null;
//       })
//       .addCase(fetchMembers.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       .addCase(deleteMember.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(deleteMember.fulfilled, (state, action) => {
//         state.loading = false;
//         state.members = state.members.filter(
//           (member) => member.id !== action.payload
//         );
//         state.error = null;
//       })
//       .addCase(deleteMember.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       .addCase(fetchUsers.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })

//       .addCase(fetchUsers.fulfilled, (state, action) => {
//         state.loading = false;
//         state.users = action.payload;
//         state.error = null;
//       })

//       .addCase(fetchUsers.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export default memberSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AxiosInstance from "../../Api/AxiosInstance";
import { toast } from "react-toastify";

// Create Team Member API call
export const createMember = createAsyncThunk(
  "members/createMember",
  async (memberData, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.post("members/", memberData);
      toast.success("Member created successfully!");
      return response.data;
    } catch (err) {
      const error = err.response ? err.response.data : "Error creating member";
      toast.error(error);
      return rejectWithValue(error);
    }
  }
);

// Update API call
export const updateMember = createAsyncThunk(
  "members/updateMember",
  async ({ id, memberData }, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.put(`members/${id}/`, memberData);
      toast.success("Member updated successfully!");
      return response.data;
    } catch (err) {
      const error = err.response ? err.response.data : "Error updating member";
      toast.error(error);
      return rejectWithValue(error);
    }
  }
);

// Fetch members API call
export const fetchMembers = createAsyncThunk(
  "members/fetchMembers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.get("members/");
      return response.data;
    } catch (err) {
      const error = err.response ? err.response.data : "Error fetching members";
      toast.error(error);
      return rejectWithValue(error);
    }
  }
);

// Fetch users API call
export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.get("users/");
      return response.data;
    } catch (err) {
      const error = err.response ? err.response.data : "Error fetching users";
      toast.error(error);
      return rejectWithValue(error);
    }
  }
);

// Delete member API call
export const deleteMember = createAsyncThunk(
  "members/deleteMember",
  async (id, { rejectWithValue }) => {
    try {
      await AxiosInstance.delete(`members/${id}/`);
      toast.success("Member deleted successfully!");
      return id;
    } catch (err) {
      const error = err.response ? err.response.data : "Error deleting member";
      toast.error(error);
      return rejectWithValue(error);
    }
  }
);

const memberSlice = createSlice({
  name: "member",
  initialState: {
    members: [],
    users: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createMember.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createMember.fulfilled, (state, action) => {
        state.loading = false;
        state.members.push(action.payload);
        state.error = null;
      })
      .addCase(createMember.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateMember.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateMember.fulfilled, (state, action) => {
        state.loading = false;
        state.members = state.members.map((member) =>
          member.id === action.payload.id ? action.payload : member
        );
        state.error = null;
      })
      .addCase(updateMember.rejected, (state, action) => {
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
      })
      .addCase(deleteMember.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteMember.fulfilled, (state, action) => {
        state.loading = false;
        state.members = state.members.filter(
          (member) => member.id !== action.payload
        );
        state.error = null;
      })
      .addCase(deleteMember.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
        state.error = null;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default memberSlice.reducer;
