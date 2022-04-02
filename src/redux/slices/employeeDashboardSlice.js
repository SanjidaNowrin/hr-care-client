import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// First, create the thunk
export const fetchAnnouncement = createAsyncThunk(
  "announcement/fetchEvents",
  async () => {
    const response = await fetch(
      "https://ancient-thicket-61342.herokuapp.com/announcement"
    ).then((res) => res.json());
    return response;
  }
);

const eventsSlice = createSlice({
  name: "announcement",
  initialState: {
    discover: [],
  },
  
  //fetch data
  extraReducers: (builder) => {
    builder.addCase(fetchAnnouncement.fulfilled, (state, action) => {
      state.discover = action.payload;
      state.status = "success";
    });
    builder.addCase(fetchAnnouncement.pending, (state, action) => {
      state.status = "pending";
    });
  },
});


export default eventsSlice.reducer;
