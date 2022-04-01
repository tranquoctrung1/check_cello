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
            let temp =  state.value.map(el => {
                if(el["_id"] === action.payload["_id"])
                {
                    return {...el, ProvinceName: action.payload["ProvinceName"], ProvinceId: action.payload["ProvinceId"], ViwateId: action.payload["ViwateId"], ViwaterName: action.payload["ViwaterName"], IsActive: action.payload["IsActive"]};
                }
                return el;
            });

            state.value = temp;
        },

        updateIsActiveLockAction: (state, action: PayloadAction<object>) => {
            let temp =  state.value.map(el => {
                if(el["_id"] === action.payload["_id"])
                {
                    return {...el, IsActive: false};
                }
                return el;
            });

            state.value = temp;
        },
        updateIsActiveOpenLockAction: (state, action: PayloadAction<object>) => {
            let temp =  state.value.map(el => {
                if(el["_id"] === action.payload["_id"])
                {
                    return {...el, IsActive: true};
                }
                return el;
            });

            state.value = temp;
        },


        deleteAction: (state, action: PayloadAction<object>) => {
            state.value = state.value.filter((value, index, arr) =>
            {
                return value['_id'] !== action.payload['_id'];
            })
        }
    }
})


export const {addAction,addItemAction, updateAction,updateIsActiveLockAction, updateIsActiveOpenLockAction , deleteAction} = AddingDeviceSlice.actions;

export default AddingDeviceSlice.reducer;