import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getTicketsAsync = createAsyncThunk(
  "tickets/getTicketsAsync",
  async () => {
    try {
      const res = await axios(`${process.env.REACT_APP_TICKET_API_URL}`);
      return res.data;
    } catch (error) {
      window.alert(error);
      throw error;
    }
  }
);
export const ticketsSlice = createSlice({
  name: "tickets",
  initialState: {
    data: [],
    loading: null,
    departureInfo: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTicketsAsync.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getTicketsAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.departureInfo = state.data.map((item) => ({
        departureCity: item.departureCity,
        departureAirport: item.departureAirport,
      }));
      console.log(state.data);
    });
    builder.addCase(getTicketsAsync.rejected, (state, action) => {});
  },
});

//   export const {} = ticketsSlice.actions;
export default ticketsSlice.reducer;
