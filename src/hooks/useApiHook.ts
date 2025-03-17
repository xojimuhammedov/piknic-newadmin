"use client";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchRecentClient } from "@/redux/slices/allApiSlice";

export function useRecentClients() {
  const dispatch = useDispatch<AppDispatch>();
  const recentClients = useSelector((state: RootState) => state.recentClients);

  useEffect(() => {
    dispatch(fetchRecentClient());
  }, [dispatch]);

  return recentClients;
}
