import { configureStore } from "@reduxjs/toolkit";
import teamReducer from "./Team/teamSlice";
import memberReducer from "./member/memberSlice";

const store = configureStore({
  reducer: {
    team: teamReducer,
    member: memberReducer,
  },
});

export default store;
