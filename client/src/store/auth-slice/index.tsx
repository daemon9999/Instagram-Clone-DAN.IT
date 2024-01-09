import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
import { getCookieItem } from "src/utils/getCookieItem";

interface AuthSliceInterface{
    userId: string | null
    token: string | null
}

const initialState: AuthSliceInterface = {
    userId: getCookieItem("userId") || null,
    token: getCookieItem('jwt') || null
}


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            const  accessToken = action.payload
            state.token = accessToken
        },
        logOut: (state) => {
            state.token = null
            state.userId = null
        },
        setUser: (state, action) => {
            const userId = action.payload
            state.userId = userId
        }
    }
})

export const {setCredentials, logOut, setUser} = authSlice.actions
export default authSlice.reducer


export const selectCurrentToken = (state: RootState) => state.auth.token
export const selectUserId = (state: RootState) => state.auth.userId