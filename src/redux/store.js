import { configureStore } from "@reduxjs/toolkit";
import employeeDashboardSlice from "./slices/employeeDashboardSlice";
import eventsReducer from './slices/eventsSlice';

export const store = configureStore({
    reducer: {
        announcement: eventsReducer,
        employee:employeeDashboardSlice,
    },
})