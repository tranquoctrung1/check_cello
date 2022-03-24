import {createSlice, PayloadAction} from '@reduxjs/toolkit'

export interface AddingDeviceState {
    Serial: string;
    ProvinceId: number;
}

const initialState: AddingDeviceState = {
    Serial: "",
    ProvinceId: 0
}

export const AddingDeviceSlice = createSlice({
    name: 'addingDevice',
    initialState,
    reducers:
    {
        submitAction : (state) => {
            state = state;
        }
    }
})


export const {submitAction} = AddingDeviceSlice.actions;

export default AddingDeviceSlice.reducer;