import EStyleSheet from 'react-native-extended-stylesheet';
import { View, Text, Pressable, FlatList,Keyboard } from 'react-native';
import BottomSheet, { BottomSheetScrollView, BottomSheetView } from '@gorhom/bottom-sheet';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { AntDesign } from '@expo/vector-icons';
import { google_key } from '../../common/config';
import { RowSpread, RowView } from '../../common/box';
import { useEffect, useRef, useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import userSelector from '../../store/Slice/userSelector';
import Animated, { CurvedTransition, FadeInUp, interpolate, useAnimatedStyle, useSharedValue, withDelay, withRepeat, withSequence, withSpring, withTiming } from 'react-native-reanimated';
import { changeAddress } from '../../store/Slice/user';
export default ({ theRef }) => {
    const { address, location } = useSelector(userSelector)
    const [list, setList] = useState([])
    const [save, setSave] = useState([{
        address: address,
        location: location
    }])
    const dispatch = useDispatch()
    const error_animate = useSharedValue(0)

    const errorStyle = useAnimatedStyle(() => {
        const opacity = error_animate.value
        return {
            opacity
        }
    })
    return <BottomSheet
        ref={theRef}
        index={-1}
        snapPoints={['90%']}
        enablePanDownToClose={true}
        handleComponent={() => <Handle bottomSheet={theRef} />}
    >

        <View style={{
            paddingHorizontal: '6%',
            marginBottom: '3%'
        }}>
            <RowSpread>
                <RowView>
                    <AntDesign name="clockcircle" size={styles._va.unit * 3} color="black" style={{
                        marginRight: styles._va.unit
                    }} />
                    <Text style={styles.p1}>{'Deliver now'}</Text>
                </RowView>
                <Pressable><View style={styles.icon_container}><Text style={styles.icon_text}>{'Schedule'}</Text></View></Pressable>
            </RowSpread>
        </View>

        <View style={{
            alignItems: 'center',
            zIndex: 2
        }}>
            <ScrollView
                keyboardShouldPersistTaps="handled"
                horizontal
                style={{
                    position: 'absolute',
                }}
            >
                <View style={{ width: styles._va.rw * 80 }}>
                    <GooglePlacesAutocomplete
                        // keyboardShouldPersistTaps='handled'
                        fetchDetails
                        styles={styles.search_container}
                        placeholder='Enter a new address'
                        query={{
                            key: google_key,
                            language: 'en'
                        }}
                        onPress={(data, details = null) => {
                            if (details && data) {
                                if (list.length > 5) {
                                    setList([...list.slice(1, 5), {
                                        address: data.structured_formatting.main_text,
                                        location: {
                                            lon: details.geometry.location.lon,
                                            lat: details.geometry.location.lng
                                        }
                                    }])
                                } else {
                                    setList([...list, {
                                        address: data.structured_formatting.main_text,
                                        location: {
                                            lon: details.geometry.location.lon,
                                            lat: details.geometry.location.lng
                                        }
                                    }])
                                }
                            }
                        }}
                    />
                </View>
            </ScrollView>
        </View>

        <View style={{
            height: 44 + 30,
        }} />
        <Animated.View style={[{ alignItems: 'center' }, errorStyle]}>
            <Text style={{
                color: 'red',
                fontSize: 16
            }}>{'Not a specific place'}</Text>
        </Animated.View>
        <View style={{ zIndex: 1 }}>
            <Text style={styles.h2}>{'Selected History'}</Text>
            <FlatList
                data={save}
                renderItem={({ item }) => <SaveAddress item={item} Click={dispatch} now={address} error={error_animate} />}
            />
        </View>

        <View style={{ zIndex: 1 }}>
            <Text style={styles.h2}>{'Recent Search'}</Text>
            <FlatList
                inverted
                data={list}
                renderItem={({ item }) => <Address item={item} Click={setSave} save_list={save} Set={dispatch} error={error_animate} />}
            />
        </View>


    </BottomSheet>
}
const SaveAddress = ({ item, Click, now, error }) => {
    const animated_icon = useSharedValue(0)
    const style = useAnimatedStyle(() => {
        const scale = interpolate(animated_icon.value, [0, 1], [0, 1], 'extend')
        return {
            transform: [
                { scale }
            ]
        }
    })
    useEffect(() => {
        if (now === item.address) {
            if (animated_icon.value === 0) {
                animated_icon.value = withSpring(1)
            }
        } else {
            if (animated_icon.value !== 0) {
                animated_icon.value = withTiming(0)
            }
        }
    }, [item, now])

    return <Pressable onPress={() => {
        if (item.location.lon && item.location.lat) {
            Click(changeAddress(item.address, item.location))
        } else {
            error.value = withSequence(withTiming(1), withTiming(1, { duration: 1500 }), withTiming(0))
        }
    }}>
        <View style={{
            alignItems: 'center'
        }}>
            <RowSpread style={{
                width: '80%',
                paddingVertical: styles._va.unit * 0.6
            }}>
                <AntDesign name="heart" size={styles._va.unit * 3} color="#fff" />
                {now === item.address && <Animated.View style={[style, {
                    position: 'absolute'
                }]}>
                    <AntDesign name="heart" size={styles._va.unit * 3} color="#f75454" />
                </Animated.View>}
                <Text style={styles.h0}>{item.address}</Text>
                <View />
            </RowSpread>
        </View>
    </Pressable>
}
const Address = ({ item, Click, save_list, Set, error }) => {

    return <Pressable onPress={() => {
        if (item.location.lon && item.location.lat) {
            Set(changeAddress(item.address, item.location))
            if (save_list.every((e) => e.address !== item.address)) {
                if (save_list.length > 2) {
                    Click([...save_list.slice(1, 3), {
                        address: item.address,
                        location: {
                            lon: item.location.lon,
                            lat: item.location.lat
                        }
                    }])
                } else {
                    Click([...save_list, {
                        address: item.address,
                        location: {
                            lon: item.location.lon,
                            lat: item.location.lat
                        }
                    }])
                }
            }
        } else {
            error.value = withSequence(withTiming(1), withTiming(1, { duration: 1500 }), withTiming(0))
        }

    }}>
        <View>

            <Animated.View
                entering={FadeInUp}
                style={{
                    alignItems: 'center'
                }}>
                <RowSpread style={{
                    width: '80%',
                    paddingVertical: styles._va.unit * 0.6
                }}>
                    <MaterialIcons name="location-pin" size={styles._va.unit * 4} color="#63adf2" />
                    <Text style={styles.h0}>{item.address}</Text>
                    <View />
                </RowSpread>
            </Animated.View>
        </View>
    </Pressable>

}
const Handle = ({ bottomSheet }) => {
    return <Pressable onPress={() => {
        Keyboard.dismiss()
        bottomSheet.current?.close()
    }}><View style={styles.hader_container}>
            <View style={{
                width: 18,
                height: 4,
                backgroundColor: "#999",
                marginBottom: styles._va.unit * 0.6
            }} />
            <Text style={styles.h1}>{"Order detail"}</Text>
        </View></Pressable>
}
const styles = EStyleSheet.create({
    _va: {
        unit: '1rem',
        rw: '$rwidth'
    },
    hader_container: {
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 8,
    },
    h0: {
        fontSize: '2rem',
        width: "70%",
    },
    h1: {
        fontSize: '$h3_h',
        color: 'black',
        fontWeight: '600',
    },
    h2: {
        fontSize: '$p2_s',
        fontWeight: '600',
        marginLeft: '6%'
    },
    p1: {
        fontSize: '$p1_s',
        fontWeight: '500',
    },
    icon_container: {
        backgroundColor: '#dedfe0',
        padding: '0.8rem',
        borderRadius: '3.4rem'
    },
    icon_text: {
        fontSize: '$p2_s',
        fontWeight: '500'
    },
    search_container: {
        textInput: {
            backgroundColor: '#dedfe0',
        }
    }
})