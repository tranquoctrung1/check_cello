import {createSlice, PayloadAction} from '@reduxjs/toolkit'

export interface HostNameState {
    value: string
}

const initialState: HostNameState = {
    value: "http://localhost:3001/api"
}

export const HostNameSlice = createSlice({
    name: 'hostName',
    initialState,
    reducers:
    {
    }
})


export const {} = HostNameSlice.actions;

export default HostNameSlice.reducer;