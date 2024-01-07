import EStyleSheet from 'react-native-extended-stylesheet';
import { View, Text } from 'react-native';
import { useCitySearchQuery, useGetBussinessQuery, useLazyGetBussinessQuery } from '../../store/Api/yelpAPI';
import { useSelector } from 'react-redux';
import { CenterView } from '../../common/box';
import { useEffect, useRef, useState } from 'react';
import Map from "../../component/Map"
import Carousel from "../../component/Carousel"
import { LATITUD_DELTA } from '../../common/config';
import Header from './Header';
import AddressSheet from '../../component/AddressSheet';
import userSelector from '../../store/Slice/userSelector';
import SearchBtn from "../../component/SearchBtn"
export default () => {
    const { address, location } = useSelector(userSelector)
    const address_sheet = useRef()
    const map_ref = useRef()
    const carousel_info = useRef(0)
    const [move, setMove] = useState({
        latitude: location.lat,
        longitude: location.lon,
        latitudeDelta: LATITUD_DELTA,
        longitudeDelta: LATITUD_DELTA * styles._va.screenRatio,
    })
    const [map, setMap] = useState({
        latitude: location.lat,
        longitude: location.lon,
        latitudeDelta: LATITUD_DELTA,
        longitudeDelta: LATITUD_DELTA * styles._va.screenRatio,
    })
    const [carousel, setCarousel] = useState(0)

    const [trigger, { isLoading, isError, data, error }, lastPromiseInfo] = useLazyGetBussinessQuery()
    // const { isLoading, isError, data, error } = useCitySearchQuery(loc)
    // const { isLoading, isError, data, error, refetch } = useGetBussinessQuery(loc)

    useEffect(() => {
        carousel_info.current = 0
    }, [data])
  
    if (isError) {
        console.log("error ")
        console.log(error)
    }

    return <View >
        <Header sheetControl={address_sheet} onYelp={trigger} output={setMove} map={map} />
        <Map businesses={data} input={move} theRef={map_ref} output={setMap} inputCarousel={carousel} />
        <SearchBtn onYelp={trigger} inputMap={map} inputSetting={{}} inputLoading={data != null || data != undefined} />
        {data != null && <Carousel businesses={data} onMove={setMove} output={setCarousel} />}
        {/* <FlatList
            data={[0, 1, 2, 3, 4, 5]}
            renderItem={({ item }) => <View style={{
                height: styles._va.rh * 20
            }} key={item + '1'} />}
        /> */}
        <AddressSheet theRef={address_sheet} />
    </View>
}
const styles = EStyleSheet.create({
    _va: {
        unit: '1rem',
        rw: '$rwidth',
        rh: '$rheight',
        screenRatio: '$rhRatio'
    }
})