import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

export const fetchTransactions = createAsyncThunk("transactions/fetchTransactions", async (userId, { rejectWithValue }) => {
  try {
    const res = await api.get(`/transactions?userId=${userId}`);
    return res.data || [];
  } catch (err) { return rejectWithValue(err.message || "Network error"); }
});

const slice = createSlice({
  name: "transactions",
  initialState: { transactions: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (s) => { s.status = "loading"; })
      .addCase(fetchTransactions.fulfilled, (s, a) => { s.status = "succeeded"; s.transactions = a.payload; })
      .addCase(fetchTransactions.rejected, (s, a) => { s.status = "failed"; s.error = a.payload || a.error.message; });
  }
});

export default slice.reducer;
