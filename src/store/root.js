import { rememberReducer } from "redux-remember"
import locationSlice from './Slice/location'
import userSlice from "./Slice/user"
import cartSlice from "./Slice/cart"
import { yelpAPI, yelpGraphQL } from "./Api/yelpAPI"
export default rememberReducer({
    locationSlice,
    userSlice,
    cart:cartSlice,
    [yelpAPI.reducerPath]: yelpAPI.reducer,
    [yelpGraphQL.reducerPath]: yelpGraphQL.reducer,

})