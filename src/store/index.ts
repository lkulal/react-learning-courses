import { combineReducers, createStore } from "redux";
import { CoursesReducer } from "./Courses/CoursesReducer";
import { NotificationReducer } from "./Notification/NotificationReducer";
import { ProfileReducer } from "./Profile/ProfileReducer";

export const allReducers = combineReducers({
    CoursesReducer, 
    NotificationReducer,
    ProfileReducer
});

export type AppState = ReturnType<typeof allReducers>;

export const store = createStore(allReducers);