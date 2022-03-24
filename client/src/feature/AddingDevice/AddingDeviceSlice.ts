import {createSlice, PayloadAction} from '@reduxjs/toolkit'

export interface AddingDeviceState {
    value: Array<object>
}

const initialState: AddingDeviceState = {
    value: []
}

export const AddingDeviceSlice = createSlice({
    name: 'addingDevice',
    initialState,
    reducers:
    {
        addAction: (state, action: PayloadAction<Array<object>>) => {

            state.value = action.payload;
        },

        addItemAction: (state, action: PayloadAction<object>) => {
            state.value.push(action.payload);
        }
    }
})


export const {addAction,addItemAction } = AddingDeviceSlice.actions;

export default AddingDeviceSlice.reducer;