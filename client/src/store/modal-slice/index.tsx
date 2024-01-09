import { createSlice } from "@reduxjs/toolkit";
interface ModalSliceProps {
    modals: {name: string, data: any | false}[]
}

const initialState : ModalSliceProps = {
    modals: []
}   


const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        appendModal: (state, action) => {
            state.modals.push(action.payload)
        },
        deleteModal: (state) => {
            state.modals.pop()
        }
    }
})

export default modalSlice.reducer
export const {appendModal, deleteModal} = modalSlice.actions
