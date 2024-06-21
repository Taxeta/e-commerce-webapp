import { createSlice } from "@reduxjs/toolkit";
import { User } from "@supabase/supabase-js";

interface UserState {
  user: User | null;
}

const initialState: UserState = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
  },
});

export const {
  setUser: setUserActionCreator,
  clearUser: clearUserActioncreator,
} = userSlice.actions;
export const userState = userSlice.reducer;
