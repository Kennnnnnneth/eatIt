import EStyleSheet from 'react-native-extended-stylesheet';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Animated, { interpolate, interpolateColor, useAnimatedStyle } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { setStyle } from '../../../common/box';
import { useNavigation } from '@react-navigation/native';
const LeftArrow = Animated.createAnimatedComponent(AntDesign)
const Share = Animated.createAnimatedComponent(Entypo)

export default ({ y, name, tab_y_final, y_a }) => {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation();
    const imgTop_height = setStyle._store.imgTop.height
    const icon_container_height = insets.top + styles._va.rh * 2.5 + styles._va.unit * 2.4
    const place = name.length > 18 ? name.slice(0, 18) + '...' : name
    const container_fade = useAnimatedStyle(() => {
        const opacity = interpolate(y.value, [insets.top, imgTop_height - icon_container_height], [0, 1], 'clamp')
        return {
            opacity
        }
    }, [y])
    const title_fade = useAnimatedStyle(() => {
        const opacity = interpolate(y.value, [insets.top, imgTop_height - icon_container_height], [0, 1], 'clamp')
        return {
            opacity
        }
    }, [y])
    const icon_color = useAnimatedStyle(() => {
        const color = interpolateColor(y.value, [insets.top, imgTop_height - icon_container_height], ['#fff', '#000'])
        return {
            color
        }
    }, [y])
    return <Animated.View
        onLayout={(e) => {
            const { height } = e.nativeEvent.layout
            tab_y_final.current = height
            y_a.value = height
        }}
        style={[styles.container, {
            width: styles._va.rw * 100,
            paddingTop: insets.top + styles._va.rh * 1,
            paddingBottom: styles._va.rh * 1.5,
            paddingHorizontal: styles._va.rw * 5,
        }]}>

        <Animated.View style={[StyleSheet.absoluteFillObject, container_fade, { backgroundColor: '#fff' }]} />
        <View style={{
            height: styles._va.unit * 2.6,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
        }}>
            <Pressable onPress={() => navigation.goBack()}>
                <LeftArrow name="arrowleft" size={styles._va.unit * 2.4} animatedProps={icon_color} />
            </Pressable>
            <Animated.View style={title_fade}><Text style={styles.text}>{place}</Text></Animated.View>
            <Share name="share-alternative" size={styles._va.unit * 2.4} animatedProps={icon_color} />
        </View>

    </Animated.View>
}
const styles = EStyleSheet.create({
    _va: {
        unit: '1rem',
        rw: '$rwidth',
        rh: '$rheight'
    },
    container: {
        position: 'absolute',
    },
    text: {
        fontSize: '2rem'
    }
})