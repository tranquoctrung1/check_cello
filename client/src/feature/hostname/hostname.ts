import {createSlice, PayloadAction} from '@reduxjs/toolkit'

export interface HostNameState {
    value: string
}

const initialState: HostNameState = {
    value: "http://112.78.4.162:5757/api"
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