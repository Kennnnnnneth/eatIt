import EStyleSheet from 'react-native-extended-stylesheet';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import Header from './Header';
import Content from "./Content"
import { useEffect, useRef } from 'react';

import { useGetStoreQuery } from '../../store/Api/yelpAPI';

import { HEADER_HEIGHT } from '../../common/config';
// import fake from "./fakeData.json"
// const fetch_data = JSON.parse(JSON.stringify(fake))
export default ({ route }) => {
    const { storeID } = route.params
    const theID = storeID + ""
    const { data, error, isLoading } = useGetStoreQuery(theID)
    const y = useSharedValue(0)
    const scrollview_ref = useRef()
    const y_menu = useSharedValue(0)
    const y_info = useSharedValue(0)
    const y_review = useSharedValue(0)
    useEffect(() => {
        scrollview_ref.current?.scrollTo({ y: 0 })
    }, [storeID])

   
    if (error) {
        console.log("Store Page error")
        console.log(error)
    }
    return data !== undefined && <View style={{
        flex: 1,
    }}>
        <Content output={y} theRef={scrollview_ref} data={data} y_menu={y_menu} y_info={y_info} y_review={y_review} />
        <Header y={y} setScroll={scrollview_ref} img={data.photos} name={data.name} rating={data.rating} scroll={scrollview_ref} y_menu={y_menu} y_info={y_info} y_review={y_review} />
    </View>
}

const styles = EStyleSheet.create({
    _va: {
        rw: '$rwidth',
    },
})
