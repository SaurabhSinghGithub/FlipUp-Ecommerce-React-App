import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    navbarOpen: false,
}

const sidebarSlice = createSlice({
    name: "sidebar",
    initialState,
    reducers: {
        setnavbarOpen: (state, action) => {
            state.navbarOpen = true;
        },
        setnavbarClose: (state, action) => {
            state.navbarOpen = false;
        },
    }
})

export const { setnavbarOpen, setnavbarClose } = sidebarSlice.actions;
export const getSidebarStatus = (state) => state.sidebar.navbarOpen;
export default sidebarSlice.reducer;