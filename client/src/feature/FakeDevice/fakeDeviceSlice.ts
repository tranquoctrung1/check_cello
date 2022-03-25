import {createSlice, PayloadAction} from '@reduxjs/toolkit'
export interface FakeDeviceState {
    value: Array<object>
}

const initialState: FakeDeviceState = {
    value: []
}

export const FakeDeviceSlice = createSlice({
    name: 'fakeDevice',
    initialState,
    reducers:
    {
        addAction: (state, action: PayloadAction<Array<object>>) => {
            state.value = action.payload;
        },
    }
})


export const {addAction} = FakeDeviceSlice.actions;

export default FakeDeviceSlice.reducer;