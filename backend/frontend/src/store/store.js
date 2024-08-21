import { configureStore } from "@reduxjs/toolkit";
import teamReducer from "./Team/teamSlice";
import memberReducer from "./member/memberSlice";
import projectReducer from "./Project/ProjectSlice";
import taskReducer from "./Task/TaskSlice";

const store = configureStore({
  reducer: {
    team: teamReducer,
    member: memberReducer,
    task: taskReducer,
    project: projectReducer,
  },
});

export default store;
