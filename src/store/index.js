import { configureStore } from '@reduxjs/toolkit'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { rememberEnhancer } from 'redux-remember';
import { yelpAPI, yelpGraphQL } from './Api/yelpAPI';
import reducer from "./root"

export default configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false, }).concat(yelpAPI.middleware).concat(yelpGraphQL.middleware),
    enhancers: [
        rememberEnhancer(
            AsyncStorage,
            [],
        )
    ]
})