import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchSellSummaries = createAsyncThunk(
  'sellSummaries/fetchSellSummaries',
  async () => {
    try {
      const response = await axios.get(`${process.env.BASE_URL}/success/sell-summaries`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

const sellSummariesSlice = createSlice({
  name: 'recentClients',
  initialState: {
    data: [],
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSellSummaries.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSellSummaries.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchSellSummaries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'An error occurred'; 
      });
  },
});

export default sellSummariesSlice.reducer;
