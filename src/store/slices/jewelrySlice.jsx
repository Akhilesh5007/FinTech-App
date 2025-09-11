import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

export const fetchJewelry = createAsyncThunk("jewelry/fetchJewelry", async (userId, { rejectWithValue }) => {
  try {
    const res = await api.get(`/jewelry?userId=${userId}`);
    return res.data || [];
  } catch (err) { return rejectWithValue(err.message || "Network error"); }
});

export const addJewelry = createAsyncThunk("jewelry/addJewelry", async (item, { rejectWithValue }) => {
  try {
    const { id, ...itemWithoutId } = item;
    const res = await api.post("/jewelry", itemWithoutId);
    
    return res.data;
    
    
    // let itemId = Math.floor(Math.random() * 100) + Math.ceil(Math.random() * 1);
    // const withItemId = { ...item,id: itemId};
    // const res = await api.post("/jewelry", withItemId);
    // const withItemIdRes = { ...res.data, id: itemId };
    // console.log('final data ', withItemIdRes)
    // return withItemIdRes;
  } 
  catch (err) { return rejectWithValue(err.message || "Network error"); }
});

export const updateJewelry = createAsyncThunk("jewelry/updateJewelry", async (item, { rejectWithValue }) => {
  try {
    const res = await api.put(`/jewelry/${item.id}`, item);
    return res.data;
  } catch (err) { return rejectWithValue(err.message || "Network error"); }
});

export const deleteJewelry = createAsyncThunk("jewelry/deleteJewelry", async (id, { rejectWithValue }) => {
  try {
    await api.delete(`/jewelry/${id}`);
    return id;
  } catch (err) { return rejectWithValue(err.message || "Network error"); }
});

const slice = createSlice({
  name: "jewelry",
  initialState: { jewelry: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchJewelry.pending, (s) => { s.status = "loading"; })
      .addCase(fetchJewelry.fulfilled, (s, a) => { s.status = "succeeded"; s.jewelry = a.payload; })
      .addCase(fetchJewelry.rejected, (s, a) => { s.status = "failed"; s.error = a.payload || a.error.message; })

      .addCase(addJewelry.fulfilled, (s, a) => { s.jewelry.push(a.payload); })
      .addCase(updateJewelry.fulfilled, (s, a) => { s.jewelry = s.jewelry.map(j => j.id === a.payload.id ? a.payload : j); })
      .addCase(deleteJewelry.fulfilled, (s, a) => { s.jewelry = s.jewelry.filter(j => j.id !== a.payload); });
  }
});

export default slice.reducer;
