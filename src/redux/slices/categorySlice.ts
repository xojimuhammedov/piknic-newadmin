// redux/dataSlice.ts

import { fetchData } from '@/api/api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


export interface DataState {
  data: any[]; // Replace `any[]` with the actual data type returned by your API
  loading: 'idle' | 'pending' | 'fulfilled' | 'rejected';
  error: string | null;
}

const initialState: DataState = {
  data: [],
  loading: 'idle',
  error: null,
};

export const fetchCategoryData = createAsyncThunk('data/fetchData', async () => {
  try {
    const data = await fetchData(); // Make sure `fetchData` is the correct function to fetch data from your API
    return data;
  } catch (error) {
    throw new Error('Failed to fetch data');
  }
});
const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategoryData.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(fetchCategoryData.fulfilled, (state, action) => {
        state.loading = 'fulfilled';
        state.data = action.payload;
      })
      .addCase(fetchCategoryData.rejected, (state, action) => {
        state.loading = 'rejected';
        state.error = action.error.message ?? 'Failed to fetch data';
      });
  },
});

export default categorySlice.reducer;
