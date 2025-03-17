import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchRecentClient = createAsyncThunk(
  'recentClients/fetchRecentClient',
  async () => {
    try {
      const response = await axios.get(`${process.env.BASE_URL}/success/clients`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

const recentClientSlice = createSlice({
  name: 'recentClients',
  initialState: {
    data: [],
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecentClient.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRecentClient.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchRecentClient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'An error occurred'; 
      });
  },
});

export default recentClientSlice.reducer;
