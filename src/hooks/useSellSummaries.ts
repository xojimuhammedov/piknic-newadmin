"use client"
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { AppDispatch, RootState } from '@/redux/store';
import { fetchSellSummaries } from '@/redux/slices/sellSummariesSlice';

function useSellSummaries() {
  const dispatch = useDispatch<AppDispatch>();
  const sellSummaries = useSelector((state: RootState) => state.sellSummaries);

  useEffect(() => {
    dispatch(fetchSellSummaries());
  }, [dispatch]);

  return sellSummaries;
}

export default useSellSummaries;
