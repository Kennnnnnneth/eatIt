import EStyleSheet from 'react-native-extended-stylesheet';
import { View, Text } from 'react-native';
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useEffect, useRef } from 'react';
import Animated, {
    useSharedValue,
    useAnimatedProps,
    BounceInDown,
    BounceInUp,
    useAnimatedStyle,
    BounceIn,
    BounceOut,
} from 'react-native-reanimated';
import { MaterialIcons } from '@expo/vector-icons';

export default ({ businesses, input, inputCarousel, theRef, output }) => {
    useEffect(() => {
        setTimeout(() => { theRef.current?.animateToRegion(input, 500) }, 100)//bug to zoom
    }, [])
    useEffect(() => {
        theRef.current?.animateToRegion(input, 500)
    }, [input])
    useEffect(() => {
        if (businesses) {
            theRef.current?.animateToRegion({
                latitude: input.latitude,
                longitude: input.longitude,
                latitudeDelta: input.latitudeDelta * 10,
                longitudeDelta: input.longitudeDelta * 10,
            }, 500)
        }
    }, [businesses, input])
    return <View>
        <MapView
            provider={PROVIDER_GOOGLE}
            style={{ width: styles._va.windowWidth, height: styles._va.windowHeight }}
            ref={theRef}
            customMapStyle={customMapStyle}
            onRegionChangeComplete={(Region, gesture) => {
                if (!gesture.isGesture) {
                    return;
                }
                output(Region)
            }}
        >
            {businesses?.map((e, i) => <AnimatedMarker item={e} index={i} carousel={inputCarousel} key={i + 'm'} />)}
        </MapView>
    </View>
}
const AnimatedMarker = ({ item, index, carousel }) => {
    const animated_scale = useSharedValue(carousel)
    useEffect(() => {
        animated_scale.value = carousel
    }, [carousel])
    const style = useAnimatedStyle(() => {
        const scale = animated_scale.value === index ? 2 : 1
        return {
            transform: [{ scale }]
        }
    }, [animated_scale])
    return <Marker
        coordinate={item.coordinates}
    >
        <View style={{ width: 30, height: 40, alignItems: 'center', justifyContent: 'center' }}>
            <Animated.View style={style} entering={BounceIn} exiting={BounceOut} >
                <MaterialIcons
                    name="location-pin"
                    size={24}
                    color="#f04e2e"
                />
            </Animated.View>
        </View>
        <Callout>

        </Callout>
    </Marker>
}

const customMapStyle = [
    {
        "featureType": "poi.business",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    }
]
const styles = EStyleSheet.create({
    _va: {
        unit: '1rem',
        rw: '$rwidth',
        rh: '$rheight',
        windowWidth: '$windowWidth',
        windowHeight: '$windowHeight',
        screenRatio: '$rhRatio'
    }
})