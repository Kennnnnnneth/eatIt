import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    loc: {
        lat: 43.801935911191244,
        lon: -79.29539503439331,
    }
}

const locationSlice = createSlice({
    name: 'address',
    initialState,
    reducers: {
        changeAddress: {
            reducer: (state, action) => {
                state.loc = action.payload
            },
            prepare: (lat, lon) => {
                return {
                    payload: {
                        lat: lat,
                        lon: lon,
                    }
                }
            }
        }
    }
})
export const { changeAddress } = locationSlice.actions
export default locationSlice.reducer 
