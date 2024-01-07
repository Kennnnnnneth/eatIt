import EStyleSheet from 'react-native-extended-stylesheet';
import { View, Text, Pressable } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';
import { useEffect } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


export default ({ onYelp, inputMap, inputSetting, inputLoading }) => {
    const press_animate = useSharedValue(1)
    const rise_animate = useSharedValue(styles._va.rh * 90)
    useEffect(() => {
        if (inputLoading) {
            rise_animate.value = styles._va.rh * 58
        } else {
            rise_animate.value = styles._va.rh * 90
        }
    }, [inputLoading])
    const rise_style = useAnimatedStyle(() => {
        const top = rise_animate.value
        return {
            top
        }
    })
    const animated_style = useAnimatedStyle(() => {
        const opacity = press_animate.value
        return {
            opacity
        }
    })
    return <Animated.View style={[{
        position: 'absolute',
        width: '100%',
        alignItems: 'center',
    }, rise_style]} >
        <Pressable onPress={() => {
            onYelp({
                lat: inputMap.latitude,
                lon: inputMap.longitude,
            })
            press_animate.value = withRepeat(withTiming(0.5), 2, true)
        }}><Animated.View style={[animated_style, {
            padding: styles._va.unit,
            backgroundColor: '#5190f5',
            borderRadius: styles._va.unit * 3.8
        }]}>
                <Text style={{
                    fontSize: styles._va.unit * 1.8
                }}>{'Search in this Area'}</Text>
            </Animated.View></Pressable>

    </Animated.View>
}
const styles = EStyleSheet.create({
    _va: {
        unit: '1rem',
        rw: '$rwidth',
        rh: '$rheight',
    }
})