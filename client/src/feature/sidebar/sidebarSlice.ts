import {createSlice, PayloadAction} from '@reduxjs/toolkit'

export interface SidebarState {
    collapsed: boolean,
    toggled: boolean
}

const initialState: SidebarState = {
    collapsed: false,
    toggled: false
}

export const SidebarSlice = createSlice({
    name: 'sidebar',
    initialState,
    reducers:
    {
        toggleAction: (state) => {
            state.toggled = !state.toggled
        },

        collapsedAction: (state) => {
            state.collapsed = !state.collapsed
        }

    }
})


export const {toggleAction, collapsedAction} = SidebarSlice.actions;

export default SidebarSlice.reducer;