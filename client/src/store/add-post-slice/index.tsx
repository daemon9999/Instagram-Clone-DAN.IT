import { createSlice } from "@reduxjs/toolkit";


interface AddPostSliceProps {
    base64Image: string | null
    step: number
}

const initialState: AddPostSliceProps = {
    base64Image: null,
    step: 1,
}

const addPostSlice = createSlice({
    name: 'addPost',
    initialState,
    reducers: {
        changeStep: (state, action) => {
            state.step = action.payload === 'back' ? state.step - 1 : state.step + 1
        },
        
        clearData: (state) => {
            state.base64Image = null
            state.step = 1
        },
        setBase64Image: (state, action) => {
            
            state.base64Image = action.payload
         
        }


    }
})

export default addPostSlice.reducer
export const { changeStep, setBase64Image, clearData } = addPostSlice.actions