import EStyleSheet from 'react-native-extended-stylesheet';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { BounceIn, Extrapolation, interpolate, useAnimatedStyle } from 'react-native-reanimated';
import { FontAwesome } from '@expo/vector-icons';
import { setStyle } from '../../../common/box';
import { LinearGradient } from 'expo-linear-gradient';
export default ({ y, img, name, rating, isLoading }) => {

    const img_height = setStyle._store.imgTop.height
    const size_animate = useAnimatedStyle(() => {
        const height = interpolate(y.value, [-100, 0], [img_height + 100, img_height], { extrapolateLeft: Extrapolation.EXTEND })
        // const top = interpolate(y.value, [0, 100], [0, -100], { extrapolateLeft: Extrapolation.CLAMP })
        return {
            // top,
            height
        }
    }, [y])
    const dim_animate = useAnimatedStyle(() => {
        const opacity = interpolate(y.value, [0, img_height], [0, 1], 'identity')
        return {
            opacity
        }
    }, [y])
    
    return <View>
        <Animated.Image source={{ uri: img[0] }} style={[size_animate, styles.img]} />
        <Animated.View style={[dim_animate, StyleSheet.absoluteFillObject, { backgroundColor: '#000' }]} />
        <Shadow />
        <View style={StyleSheet.absoluteFill}>
            <View style={{
                position: 'absolute',
                bottom: 0,
                left: styles._va.rw * 4
            }}>
                <View style={{
                    paddingBottom: 2,
                    width: styles._va.rw * 80

                }}><Text style={styles.h1}>{name}</Text></View>
                <View style={{
                    flexDirection: 'row',
                    marginBottom: 8,
                    height: 25
                }}>
                    {
                        rating !== undefined && Array.from({ length: Math.floor(rating) }, (_, index) => { index + 1 }).map((e, i) => <Rating key={i + 's'} index={i} />)
                    }
                </View>
            </View>
        </View>
        
    </View>
}
const Shadow = () => {
    return <View style={StyleSheet.absoluteFill} >
        <LinearGradient
            style={StyleSheet.absoluteFill}
            start={[0, 0.3]}
            end={[0, 1]}
            colors={["transparent", "rgba(0, 0, 0, 0.2)", "black"]}
        />
    </View>
}
const Rating = ({ index }) => {
    return <Animated.View entering={BounceIn.delay(100 * index)}>
        <FontAwesome name="star" size={24} color="#fea11c" />
    </Animated.View>
}
const styles = EStyleSheet.create({
    $rw: '$rwidth',
    _va: {
        rw: '$rwidth'
    },
    img: {
        width: '$windowWidth',
        resizeMode: "cover",
    },
    h1: {
        color: '#fff',
        fontSize: '3.8rem',
        fontWeight: '700',
    }
})