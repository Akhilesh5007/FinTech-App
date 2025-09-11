import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

// login
export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await api.get(`/users?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`);
      if (!res.data || res.data.length === 0) return rejectWithValue("Invalid credentials");
      return res.data[0];
    } catch (err) {
      return rejectWithValue(err.message || "Network error");
    }
  }
);

// signup
export const signup = createAsyncThunk(
  "auth/signup",
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const exists = await api.get(`/users?email=${encodeURIComponent(email)}`);
      if (exists.data && exists.data.length > 0) 
        return rejectWithValue("Email already registered");
      const res = await api.post("/users", { name, email, password });
      // create wallet for user
      await api.post("/wallet", { userId: res.data.id, balance: 0 });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.message || "Network error");
    }
  }
);

// fetch user by id
export const fetchUserById = createAsyncThunk(
  "auth/fetchUserById",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await api.get(`/users/${userId}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.message || "Network error");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: JSON.parse(localStorage.getItem("user")) || null,
    status: "idle",
    error: null
  },
  reducers: {
    logout(state) {
      state.user = null;
      state.status = "idle";
      state.error = null;
      localStorage.removeItem("user");
    }
  },
  extraReducers: (builder) => {
    builder
      // login
      .addCase(login.pending, (s) => { s.status = "loading"; s.error = null; })
      .addCase(login.fulfilled, (s, a) => { s.status = "succeeded"; s.user = a.payload; localStorage.setItem("user", JSON.stringify(a.payload)); })
      .addCase(login.rejected, (s, a) => { s.status = "failed"; s.error = a.payload || a.error.message; })
      // signup
      .addCase(signup.pending, (s) => { s.status = "loading"; s.error = null; })
      .addCase(signup.fulfilled, (s, a) => { s.status = "succeeded"; s.user = a.payload; localStorage.setItem("user", JSON.stringify(a.payload)); })
      .addCase(signup.rejected, (s, a) => { s.status = "failed"; s.error = a.payload || a.error.message; })
      // fetchUserById
      .addCase(fetchUserById.pending, (s) => { s.status = "loading"; })
      .addCase(fetchUserById.fulfilled, (s, a) => { s.status = "succeeded"; s.user = a.payload; localStorage.setItem("user", JSON.stringify(a.payload)); })
      .addCase(fetchUserById.rejected, (s, a) => { s.status = "failed"; s.error = a.payload || a.error.message; });
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
