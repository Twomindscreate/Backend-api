import { configureStore } from "@reduxjs/toolkit";
import teamReducer from "./Team/teamSlice";
import memberReducer from "./member/memberSlice";
import authReducer from "./auth/authSlice";

const store = configureStore({
  reducer: {
    team: teamReducer,
    member: memberReducer,
    auth: authReducer,
  },
});

export default store;
