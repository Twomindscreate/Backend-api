import { configureStore } from "@reduxjs/toolkit";
import teamReducer from "./Team/teamSlice";
import memberReducer from "./member/memberSlice";

import taskReducer from "./Task/TaskSlice";

const store = configureStore({
  reducer: {
    team: teamReducer,
    member: memberReducer,
    task: taskReducer,
  },
});

export default store;
