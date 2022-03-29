import {createSlice, PayloadAction} from '@reduxjs/toolkit'
export interface ViwaterState {
    value: Array<object>
}

const initialState: ViwaterState = {
    value: []
}

export const ViwaterSlice = createSlice({
    name: 'viwater',
    initialState,
    reducers:
    {
        addAction: (state, action: PayloadAction<Array<object>>) => {
            state.value = action.payload;
        },

        addItemAction: (state, action: PayloadAction<object>) => {
            state.value.push(action.payload);
        }, 

        updateItemAction: (state, action: PayloadAction<object>) => {
            let temp =  state.value.map(el => {
                if(el["_id"] === action.payload["_id"])
                {
                    return {...el, Name: action.payload["Name"], Id: action.payload["Id"]};
                }
                return el;
            });

            state.value = temp;
        },

        deleteItemAction: (state, action: PayloadAction<object>) => {
            let index = state.value.findIndex(el => el["_id"] === action.payload["_id"]);

            if(index !== -1) {
                state.value.splice(index, 1);
            }
        }
    }
})


export const {addAction, addItemAction, updateItemAction, deleteItemAction} = ViwaterSlice.actions;

export default ViwaterSlice.reducer;