import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { setUp } from "../../AxiosProvider";
import { AxiosError } from "axios";

const axiosInstance = await setUp();
interface UserState {
  name: string;
  email: string;
}

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getUser.fulfilled, (state, action) => {
      console.log(action.payload);
    });
  },
});
export const getUser = createAsyncThunk("user/getUser", async () => {
  try {
    const result = await axiosInstance.get("/user");
    if (result.status === 200) {
      const data: UserState = {
        name: result.data.name,
        email: result.data.email,
      };
      return data;
    }

    throw new Error();
  } catch (error: any) {
    return null;
  }
});
export default userSlice.reducer;
