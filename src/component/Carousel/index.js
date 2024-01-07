import EStyleSheet from 'react-native-extended-stylesheet';
import { View, Text, FlatList, Pressable, Image } from 'react-native';
import { RowView } from '../../common/box';
import Rating from '../Rating';
import { GestureDetector, Gesture, Directions } from 'react-native-gesture-handler';
import { changeAddress } from '../../store/Slice/location';
import { useCallback, useEffect, useRef, useState } from 'react';
import { LATITUD_DELTA } from '../../common/config';
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
const gap_size = 8
const cell_size = 40
const list_pos = 20
export default ({ businesses, onMove, output }) => {
    const navigation = useNavigation();
    const a_ref = useRef(0)
    const list_ref = useRef()
    const animated_card = useSharedValue(0)

    const update_to_map = useCallback((index) => {
        const { latitude, longitude } = businesses[index].coordinates
        onMove({
            latitude: latitude - LATITUD_DELTA / 5,
            longitude,
            latitudeDelta: LATITUD_DELTA,
            longitudeDelta: LATITUD_DELTA * styles._va.screenRatio,
        })
        animated_card.value = withTiming(a_ref.current, { duration: 500 })
        output(a_ref.current)
    })
    const flingLeft = Gesture.Fling().runOnJS(true)
        .direction(Directions.LEFT)
        .onStart(() => {
            if (a_ref.current < businesses.length - 1) {
                a_ref.current = a_ref.current + 1
                list_ref?.current?.scrollToIndex({
                    animated: true,
                    index: a_ref.current
                })
                update_to_map(a_ref.current)
            }
        })
    const flingRight = Gesture.Fling().runOnJS(true)
        .direction(Directions.RIGHT)
        .onStart(() => {
            if (a_ref.current !== 0) {
                a_ref.current = a_ref.current - 1
                list_ref?.current?.scrollToIndex({
                    animated: true,
                    index: a_ref.current
                })
                update_to_map(a_ref.current)
            }
        })
    const total_fling = Gesture.Race(flingLeft, flingRight)
    useEffect(() => {
        list_ref.current?.scrollToIndex({ index: 0 })
        animated_card.value = 0
        a_ref.current = 0
    }, [businesses])

    const ChangeFocus = (i) => {
        list_ref.current?.scrollToIndex({ index: i, animated: true })
        animated_card.value = i
        a_ref.current = i
    }

    return businesses && <GestureDetector gesture={total_fling}>
        <View style={{
            position: 'absolute',
            bottom: styles._va.rh * list_pos,
        }}><FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                scrollEnabled={false}
                ref={list_ref}
                data={businesses}
                renderItem={({ item, index }) => <Cell item={item}
                    index={index}
                    animated_props={animated_card}
                    click={navigation}
                    onChange={ChangeFocus}
                />}
                style={{
                    left: styles._va.rw * cell_size / 2,
                    overflow: 'visible'
                }}
            /></View>
    </GestureDetector>
}

const Cell = ({ item, index, animated_props, click,onChange }) => {
    const { name, photos, rating, price, is_closed, review_count, id } = item
    const animated_style = useAnimatedStyle(() => {
        const scale = interpolate(animated_props.value, [index - 1, index, index + 1], [1, 1.3, 1], 'clamp')
        return {
            transform: [
                { scale }
            ]
        }
    }, [animated_props])
    return <Pressable onPress={() => {
        onChange(index)
        click.navigate('Store', { storeID: id })
    }}><Animated.View
        style={[animated_style, {
            width: styles._va.rw * cell_size,
            marginRight: styles._va.rw * gap_size,
            borderRadius: 20,
            backgroundColor: '#fff',
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,

            elevation: 5,
            overflow: 'hidden',
            height: styles._va.rh * 29
        }]}>
            <Image source={{ uri: photos + '' ?? "" }} style={{
                resizeMode: 'cover',
                width: styles._va.rw * cell_size,
                height: styles._va.rw * cell_size / 1.5,
            }} />

            <View>
                <View style={{
                    padding: styles._va.unit * 0.6
                }}>
                    <Text style={{
                        fontSize: styles._va.unit * 2,
                        color: '#707070',
                        fontWeight: '600',
                        marginRight: styles._va.unit * 2
                    }}>{name}</Text>
                    <Text style={{
                        color: is_closed ? "#dc782b" : '#27be59',
                        fontSize: styles._va.unit * 1.8,
                        fontWeight: '700'
                    }}>{is_closed ? "Close" : 'Open'}</Text>
                </View>
                <RowView style={{
                    marginLeft: styles._va.unit * 0.6
                }}>
                    <Rating star={rating} size={styles._va.unit * 1.5} />
                    <Text style={{
                        fontSize: styles._va.unit * 1.3,
                        color: '#707070',
                        marginHorizontal: 4
                    }}>{`(${review_count})`}</Text>
                    {price != null && <Text style={{
                        color: '#707070',
                        fontSize: styles._va.unit * 1.3
                    }}>{price}</Text>}
                </RowView>
            </View>
        </Animated.View></Pressable>
}
const styles = EStyleSheet.create({
    _va: {
        unit: '1rem',
        rw: '$rwidth',
        rh: '$rheight',
        screenRatio: '$rhRatio'
    }
})