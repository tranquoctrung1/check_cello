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
        },
        updateAction: (state, action: PayloadAction<object>) => {
            
        },

        deleteAction: (state, action: PayloadAction<object>) => {
            state.value = state.value.filter((value, index, arr) =>
            {
                return value['_id'] !== action.payload['_id'];
            })
        }
    }
})


export const {addAction,addItemAction, updateAction,  deleteAction} = AddingDeviceSlice.actions;

export default AddingDeviceSlice.reducer;