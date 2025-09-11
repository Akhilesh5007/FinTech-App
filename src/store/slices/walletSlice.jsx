// src/redux/walletSlice.jsx
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

// ─────────────────────────────────────────────
// Fetch existing wallet by userId
// ─────────────────────────────────────────────
export const fetchWallet = createAsyncThunk(
  "wallet/fetchWallet",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await api.get(`/wallet?userId=${userId}`);
      return (res.data && res.data[0]) || null;
    } catch (err) {
      return rejectWithValue(err.message || "Network error");
    }
  }
);

// ─────────────────────────────────────────────
// Deposit amount into wallet
// ─────────────────────────────────────────────
export const depositAmount = createAsyncThunk(
  "wallet/depositAmount",
  async ({ userId, amount }, { rejectWithValue }) => {
    try {
      // Get current wallet by userId
      const res = await api.get(`/wallet?userId=${userId}`);
      const wallet = res.data[0];

      if (!wallet) throw new Error("Wallet not found");

      const updatedWallet = {
        ...wallet,
        balance: Number(wallet.balance) + Number(amount),
      };

      const putRes = await api.put(`/wallet/${wallet.id}`, updatedWallet);
      return putRes.data;
    } catch (err) {
      return rejectWithValue(err.message || "Network error");
    }
  }
);

// ─────────────────────────────────────────────
// Slice
// ─────────────────────────────────────────────
const walletSlice = createSlice({
  name: "wallet",
  initialState: { wallet: null, status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchWallet
      .addCase(fetchWallet.pending, (s) => {
        s.status = "loading";
      })
      .addCase(fetchWallet.fulfilled, (s, a) => {
        s.status = "succeeded";
        s.wallet = a.payload;
      })
      .addCase(fetchWallet.rejected, (s, a) => {
        s.status = "failed";
        s.error = a.payload || a.error.message;
      })

      // depositAmount
      .addCase(depositAmount.fulfilled, (s, a) => {
        s.wallet = a.payload; // update wallet with new balance
      })
      .addCase(depositAmount.rejected, (s, a) => {
        s.error = a.payload || a.error.message;
      });
  },
});

export default walletSlice.reducer;











// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import api from "../../api/api";

// export const depositAmount = createAsyncThunk(
//   "wallet/depositAmount",
//   async ({ userId, amount }, { rejectWithValue }) => {
//     try {
//       // 1. Get current wallet entry
//       const res = await api.get(`/wallet?userId=${userId}`);
//       const wallet = res.data[0];

//       if (!wallet) throw new Error("Wallet not found");

//       // 2. Update balance
//       const updated = {
//         ...wallet,
//         balance: Number(wallet.balance) + Number(amount),
//       };

//       // 3. PUT request to update wallet
//       const putRes = await api.put(`/wallet/${wallet.id}`, updated);
//       return putRes.data;
//     } catch (err) {
//       return rejectWithValue(err.message || "Network error");
//     }
//   }
// );
// // 

// const walletSlice = createSlice({
//   name: "wallet",
//   initialState: { data: [], loading: false, error: null },
//   reducers: {},
//   extraReducers: builder => {
//     builder
//       .addCase(depositAmount.fulfilled, (state, action) => {
//         const idx = state.data.findIndex(w => w.id === action.payload.id);
//         if (idx >= 0) {
//           state.data[idx] = action.payload;
//         } else {
//           state.data.push(action.payload);
//         }
//       });
//   },
// });

// export default walletSlice.reducer;











// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import api from "../../api/api";

// export const fetchWallet = createAsyncThunk("wallet/fetchWallet", async (userId, { rejectWithValue }) => {
//   try {
//     const res = await api.get(`/wallet?userId=${userId}`); // note: 'wallet' as in db.json
//     // json-server returns array for queries
//     return (res.data && res.data[0]) || null;
//   } catch (err) { return rejectWithValue(err.message || "Network error"); }
// });

// const slice = createSlice({
//   name: "wallet",
//   initialState: { wallet: null, status: "idle", error: null },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchWallet.pending, (s) => { s.status = "loading"; })
//       .addCase(fetchWallet.fulfilled, (s, a) => { s.status = "succeeded"; s.wallet = a.payload; })
//       .addCase(fetchWallet.rejected, (s, a) => { s.status = "failed"; s.error = a.payload || a.error.message; });
//   }
// });

// export default slice.reducer;

