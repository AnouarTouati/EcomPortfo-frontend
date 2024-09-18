import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { setUp } from "../../AxiosProvider";

interface CartState {
  itemsCount: number;
}

const initialState: CartState = {
  itemsCount: 0,
};
const axiosInstance = await setUp();
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    getItemsCount: (state) => {
      state.itemsCount += 1;
    },
  },
  extraReducers(builder) {
    builder.addCase(
      getItemsCountAsync.fulfilled,
      (state, action: PayloadAction<number>) => {
        state.itemsCount = action.payload;
      }
    );
  },
});
export const getItemsCountAsync = createAsyncThunk(
  "cart/getItemsCountAsync",
  async () => {
    const result = await axiosInstance.get("/cart/products/count");
    return result.data.count;
  }
);
export const { getItemsCount } = cartSlice.actions;
export default cartSlice.reducer;
