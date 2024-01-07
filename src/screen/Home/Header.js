import EStyleSheet from 'react-native-extended-stylesheet';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { google_key } from '../../common/config';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import userSelector from '../../store/Slice/userSelector'
import { RowSpread, RowView } from '../../common/box';
import Animated, { interpolate, useAnimatedProps, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { LATITUD_DELTA } from '../../common/config';
import { Entypo } from '@expo/vector-icons';

const AnimatedIcon = Animated.createAnimatedComponent(FontAwesome5);
export default ({ sheetControl, onYelp, output, map }) => {
    const { address } = useSelector(userSelector)
    const press_control = useSharedValue(0)
    const icon_control = useSharedValue(0)
    const insets = useSafeAreaInsets();
    const animated_style = useAnimatedStyle(() => {
        const translateX = interpolate(press_control.value, [0, 1], [0, styles._va.unit * 4], "identity")
        return {
            transform: [
                { translateX }
            ]
        }
    })
    const icon_home = useAnimatedProps(() => {
        const color = icon_control.value !== 0 ? 'black' : 'white'
        return {
            color
        }
    }, [icon_control])
    const icon_walk = useAnimatedProps(() => {
        const color = icon_control.value !== 0 ? 'white' : 'black'
        return {
            color
        }
    }, [icon_control])
    return <View style={[styles._va.container, {
        paddingTop: insets.top,
        paddingBottom: styles._va.unit * 0.6,
        paddingHorizontal: styles._va.rw * 4,
    }]}>
        <RowSpread>
            <Pressable onPress={() => {
                sheetControl.current.expand()
            }}><View>
                    <Text style={styles.address_title}>{'Deliver now'}</Text>
                    <RowView>
                        <Text style={styles.address_text}>{address}</Text>
                        <MaterialIcons name="arrow-drop-down" size={styles._va.unit * 2.4} color="black" />
                    </RowView>
                </View></Pressable>

            <Pressable onPress={() => {
                if (icon_control.value === 0) {
                    press_control.value = withTiming(1)
                    icon_control.value = 1
                } else {
                    press_control.value = withTiming(0)
                    icon_control.value = 0
                }
            }}><RowView>
                    <Animated.View style={[styles.icon_background, animated_style]} />
                    <View style={styles.icon}><AnimatedIcon name="home" size={styles._va.unit * 2.4} animatedProps={icon_home} /></View>
                    <View style={styles.icon}><AnimatedIcon name="walking" size={styles._va.unit * 2.4} animatedProps={icon_walk} /></View>
                </RowView></Pressable>
        </RowSpread>
        <View style={{ alignItems: 'center' }}>
            <RowView style={{
                backgroundColor: '#fff',
                borderRadius: 44,
                overflow: 'hidden'
            }}>
                <View style={{ width: '80%', maxHeight: 800, }}>
                    <GooglePlacesAutocomplete
                        fetchDetails
                        styles={styles.search_container}
                        placeholder='Search places arround...'
                        query={{
                            key: google_key,
                            language: 'en'
                        }}
                        onPress={(data, details = null) => {
                            if (details) {
                                output({
                                    latitude: details.geometry.location.lat,
                                    longitude: details.geometry.location.lng,
                                    latitudeDelta: LATITUD_DELTA,
                                    longitudeDelta: LATITUD_DELTA * styles._va.screenRatio,
                                })
                                onYelp({ lat: details.geometry.location.lat, lon: details.geometry.location.lng })
                            }
                        }}
                    />
                </View>
                <Entypo name="dots-three-vertical" size={24} color="black" style={{
                    position: 'absolute',
                    right: 15,
                    top: 8
                }} />
                <View style={{ width: 50 }} />
            </RowView>
        </View>
    </View>

}
const styles = EStyleSheet.create({
    _va: {
        unit: '1rem',
        rw: '$rwidth',
        screenRatio: '$rhRatio'
    },
    search_container: {
        container: {
            flex: 0
        }
    },
    container: {
        position: 'absolute',
        backgroundColor: '#fff',
        borderRadius: 20,
        backgroundColor: '#fff',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    address_title: {
        fontSize: '1.5rem',
        color: '#707070'
    },
    address_text: {
        fontSize: '1.8rem',
        fontWeight: '600'
    },
    icon: {
        width: '4rem',
        height: '3rem',
        alignItems: 'center',
        justifyContent: 'center'
    },
    icon_background: {
        position: 'absolute',
        width: '4rem',
        height: '3rem',
        borderRadius: '3rem',
        backgroundColor: 'black'
    }
})