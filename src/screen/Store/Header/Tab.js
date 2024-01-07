import EStyleSheet from 'react-native-extended-stylesheet';
import { View, Text, Pressable, TouchableWithoutFeedback } from 'react-native';
import Animated, { interpolate, useAnimatedProps, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useCallback, useEffect } from 'react';

const tabTittle = [
    "Menu",
    "Overview",
    'Review',
]
export default ({ y0, y1, yt, scrollView, y_menu, y_info, y_review, y_a }) => {
    const nav = [
        y_menu,
        y_info,
        y_review,
    ]
    const toTop = useAnimatedStyle(() => {
        const translateY = interpolate(yt.value, [-200, 0, 20, 50, y0 - y_a.value, y0 - y_a.value + 10], [200, 0, -20, -50, y_a.value - y0, y_a.value - y0], 'identity')
        return {
            transform: [{ translateY }]
        }
    }, [yt, y_a])
    const animatedUnderline = useAnimatedStyle(() => {

        const translateX = yt.value <= y_info.value - y_a.value - 37 ? withTiming(0) : yt.value <= y_review.value - y_a.value - 37 ? withTiming(styles._va.rw * 33.3) : withTiming(styles._va.rw * 66.6)
        return {
            transform: [{ translateX }]
        }
    }, [yt])
    const tabPress = useCallback((index) => {
        scrollView.current.scrollTo({ y: nav[index].value - y_a.value - 36, animated: true })
    }, [scrollView])

    return <Animated.View style={[styles.container, toTop, { top: y0 }]}>
        <Animated.View style={[styles.underLine, animatedUnderline]} />
        {
            tabTittle.map((e, i) => {
                return <TouchableWithoutFeedback TouchableWithoutFeedback key={i + 'k'} onPress={() => tabPress(i)}><View style={styles.tab_box}>
                    <View style={{ height: 19 }}><Text style={{ fontSize: 18 }}>{e}</Text></View>
                </View></TouchableWithoutFeedback>
            })
        }
    </Animated.View>
}
const styles = EStyleSheet.create({
    _va: {
        unit: '1rem',
        rw: '$rwidth'
    },
    container: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderTopWidth: 1,
        borderColor: '#DADCE0',
        position: 'absolute',
        width: '100%',
        backgroundColor: '#fff'
    },
    tab_box: {
        width: '33.3%',
        alignItems: 'center',
        padding: 8,
    },
    underLine: {
        position: 'absolute',
        width: '33.3%',
        bottom: 0,
        borderBottomWidth: 4,
        borderColor: '#1A73E8'
    }
})