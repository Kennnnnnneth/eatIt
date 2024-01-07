import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    userNamr: 'Ken',
    phone: '6678987702',
    address: '2629 Kennedy rd',
    location: {
        lat: 43.801935911191244,
        lon: -79.29539503439331,
    }
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        incrementByAmount(state, action) {
            state.userNamr = action.payload
        },
        changeAddress: {
            reducer: (state, action) => {
                state.address = action.payload.address
                state.location = action.payload.location
            },
            prepare: (address, location) => {
                return {
                    payload: {
                        address,
                        location
                    }
                }
            }
        }
    },
})

export default userSlice.reducer
export const { incrementByAmount, changeAddress } = userSlice.actions
