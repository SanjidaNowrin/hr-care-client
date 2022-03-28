import { configureStore } from "@reduxjs/toolkit";
import eventsReducer from './slices/eventsSlice';
import employeeDashboardReducer from './slices/employeeDashboardSlice';


export const store = configureStore({
    reducer: {
        announcement: eventsReducer,
        employee: employeeDashboardReducer
    }
})