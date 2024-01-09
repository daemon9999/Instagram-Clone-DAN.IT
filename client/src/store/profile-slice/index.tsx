import { createSlice } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "..";
interface ProfileSliceInterface {
  user: any;
  loading: boolean;
  error: string | null;
}

const initialState: ProfileSliceInterface = {
  user: null,
  loading: false,
  error: null,
};


export const fetchProfile = (token: string) => async (dispatch: AppDispatch) => {
    dispatch(fetchProfileStart());
    try {
      // Perform the API call to get the user profile using the token
      const response = await fetch('http://localhost:8080/api/getProfile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: "include"
      });
      if (!response.ok) {
        throw new Error('Failed to fetch profile');
      }
      const userProfile = await response.json();
      dispatch(fetchProfileSuccess(userProfile));
    } catch (error: any) {
      dispatch(fetchProfileFailure(error.message));
    }
  };

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    fetchProfileStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchProfileSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    fetchProfileFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchProfileStart, fetchProfileSuccess, fetchProfileFailure } =
  profileSlice.actions;
export const selectProfile = (state: RootState) => state.profile;
export default profileSlice.reducer;