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
  reducers: {
    addToOrderList: (state, { payload }) => {
      state.orderList.push(payload);
    },
    removeFromOrderList: (state, { payload }) => {
      state.orderList = state.orderList.filter(
        (book) => book.id !== payload.id
      );
    },
  },
  //fetch data
  extraReducers: (builder) => {
    builder.addCase(fetchAnnouncement.fulfilled, (state, action) => {
      state.services = action.payload;
      state.status = "success";
    });
    builder.addCase(fetchAnnouncement.pending, (state, action) => {
      state.status = "pending";
    });
  },
});

export const { addToOrderList, removeFromOrderList } = eventsSlice.actions;

export default eventsSlice.reducer;
