import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

export const fetchWallet = createAsyncThunk("wallet/fetchWallet", async (userId, { rejectWithValue }) => {
  try {
    const res = await api.get(`/wallet?userId=${userId}`); // note: 'wallet' as in db.json
    // json-server returns array for queries
    return (res.data && res.data[0]) || null;
  } catch (err) { return rejectWithValue(err.message || "Network error"); }
});

const slice = createSlice({
  name: "wallet",
  initialState: { wallet: null, status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWallet.pending, (s) => { s.status = "loading"; })
      .addCase(fetchWallet.fulfilled, (s, a) => { s.status = "succeeded"; s.wallet = a.payload; })
      .addCase(fetchWallet.rejected, (s, a) => { s.status = "failed"; s.error = a.payload || a.error.message; });
  }
});

export default slice.reducer;
