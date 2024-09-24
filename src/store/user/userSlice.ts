import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getAxios } from "../../Axios";

const axiosInstance = await getAxios();
interface UserState {
  name: string | null;
  email: string | null;
  loggedIn: boolean;
  role: string | null;
  emailVerifiedAt: string | null;
}

const initialState: UserState = {
  name: "",
  email: "",
  loggedIn: false,
  role: null,
  emailVerifiedAt: null,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.loggedIn = action.payload.loggedIn;
      state.role = action.payload.role;
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
        loggedIn: true,
        role: result.data.role,
      };
      return data;
    }

    throw new Error();
  } catch {
    return initialState;
  }
});
export default userSlice.reducer;
