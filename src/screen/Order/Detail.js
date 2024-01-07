import EStyleSheet from 'react-native-extended-stylesheet';
import styled from 'styled-components/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';



import { View, Text, Image, ScrollView, TouchableWithoutFeedback, FlatList, Pressable } from 'react-native';


import { SharedElement } from 'react-navigation-shared-element';
import Animated, { FadeIn, FadeOut, FlipInXUp, interpolate, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import { useForm, Controller } from "react-hook-form";
import { useDispatch } from 'react-redux'
import { nanoid } from '@reduxjs/toolkit';

import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

import { RowSpread, RowView } from "../../common/box"
import { useEffect, useState } from 'react';
import { cartAdd, cartUpdate } from "../../store/Slice/cart"
import { formatter } from '../../common/config';
import { ORDER_METHORD } from "../../common/config"
export default ({ route, navigation }) => {
    const insets = useSafeAreaInsets();
    const dispatch = useDispatch()
    const [total, setTotal] = useState(price)
    const [qu, setQu] = useState(1)
    const [type, setType] = useState(0)
    const { shareID, img, name, price, star, id, category, method } = route.params;

    const fake_detail = {
        itemID: id,
        type: [
            {
                name: 'Spice',
                value: 0,
                color: '#d95a30'
            },
            {
                name: 'Non-Spice',
                value: 40,
                color: '#0e5266'
            },
            {
                name: 'Super Hot',
                value: 100,
                color: '#107339'
            }
        ]

    }
    useEffect(() => {
        const sum = qu * (price + fake_detail?.type[type].value)
        setTotal(sum)
    }, [qu, type])


    return <View style={{ flex: 1 }}>
        <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ backgroundColor: '#FDFDFD' }}
            contentContainerStyle={{ alignItems: 'center', marginTop: insets.top }}
        >

            <SharedElement id={shareID} style={styles.share}>
                <Image source={img} style={styles.img} />
            </SharedElement>

            <Animated.View entering={FadeIn.delay(200)} exiting={FadeOut} style={{ alignItems: 'center', width: '100%' }}>
                <Title name={name} category={category} />
                <List data={fake_detail} click={setType} />
                <Price price={total} number={qu} click={setQu} />
                <Descp name={name} />
            </Animated.View>

            <View style={{ height: styles._va.rh * 20 }} />
        </ScrollView>

        <Animated.View entering={FadeIn.delay(400)} style={{
            position: 'absolute',
            bottom: insets.bottom,
            width: '100%',
            alignItems: 'center'
        }}><RowSpread style={{ width: '90%' }}>


                <View style={{
                    backgroundColor: '#fff',
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5,
                    borderRadius: 24,
                }}>
                    <AntDesign.Button name="arrowleft" size={24} color="black" borderRadius={20}
                        backgroundColor={'#fff'} iconStyle={{ marginRight: 0 }}
                        onPress={() => navigation.goBack()}
                    />
                </View>

                <TouchableWithoutFeedback onPress={() => {
                    navigation.goBack()
                    // setTimeout(() => dispatch(cartAdd({ id: nanoid(), })), 100)
                    dispatch(cartAdd({ id: nanoid(), itemID: id, price: price, img: img, name: name, type: fake_detail.type[type], quantity: qu }))
                }}>
                    <View style={{
                        borderRadius: 18,
                        backgroundColor: '#1A73E8',
                        paddingVertical: 10,
                        paddingHorizontal: 50,
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,
                        elevation: 5,
                        borderRadius: 24,
                    }}>
                        <Text style={{ fontSize: 18, color: '#fff' }}>{'ADD TO CART'}</Text>
                    </View></TouchableWithoutFeedback>


            </RowSpread></Animated.View>
    </View>

}

const Title = ({ name, category }) => {
    return <View style={{ width: '85%', marginTop: 20 }}>
        <Text style={{ fontSize: 45, fontWeight: '600' }}>{name}</Text>
        <Text style={{ fontSize: 20, color: '#969699' }}>{category}</Text>
    </View>
}
const List = ({ data, click }) => {
    const select = useSharedValue(0)
    const Cell = ({ item, index, animated }) => {
        const scale_animate = useAnimatedStyle(() => {
            const scale = select.value !== index ? withTiming(1) : withTiming(1.3)
            return {
                transform: [{ scale }]
            }
        }, [animated])
        return <Pressable onPress={() => {
            if (index !== select.value) {
                select.value = index
                click(index)
            }
        }}>
            <RowView>
                <Animated.View style={[{ marginRight: 14, width: 20, height: 20, borderRadius: 20, backgroundColor: item.color }, scale_animate]} />
                <Text style={{ textTransform: 'capitalize', width: 40 }}>{item.name}</Text>
            </RowView>
        </Pressable>
    }
    return <FlatList
        data={data.type}
        style={{ overflow: 'visible', marginTop: 14 }}
        horizontal
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={<View style={{ width: 20 }} />}
        renderItem={({ item, index }) => <Cell item={item} index={index} animated={select} />}
    />
}
const Price = ({ price, number, click }) => {

    return <View style={{ width: '85%', marginTop: 40 }}>
        <RowSpread>
            <Text style={{ fontSize: 35, fontWeight: '600' }}>{formatter.format(price)}</Text>
            <RowView style={{
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
            }}>
                <Feather.Button name="minus" size={20} color="black" backgroundColor={'#fff'} borderRadius={25} onPress={() => {
                    if (number > 1) {
                        click(number - 1)
                    }
                }} />
                <View style={{ width: 30, alignItems: 'center' }}><Text style={{ fontSize: 24, fontWeight: 'bold' }}>{number}</Text></View>
                <Feather.Button name="plus" size={20} color="black" backgroundColor={'#fff'} borderRadius={25} onPress={() => {
                    if (number < 98) {
                        click(number + 1)
                    }
                }} />
            </RowView>
        </RowSpread>
    </View>
}

const Descp = ({ name }) => {
    return <View style={{ width: '80%', marginTop: 20 }}>
        <Text style={{ fontSize: 18, textTransform: 'capitalize', fontWeight: '600' }}>{'About ' + name}</Text>
        <Text style={{ fontSize: 15, color: '#4e4f4f' }}>{`
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse vulputate neque purus, a laoreet justo fermentum a. Mauris neque metus, tempor ut lacus eu, mattis scelerisque diam. 
        Integer eu dignissim ligula. Aenean et iaculis risus. Duis consequat ipsum in venenatis suscipit. In suscipit eget massa at auctor. Aenean consequat, libero at facilisis sodales, enim dui pulvinar mi, ut placerat ex lectus vitae libero. Vestibulum vehicula eu eros vel`}</Text>
    </View>
}
const styles = EStyleSheet.create({
    _va: {
        unit: '1rem',
        rw: '$rwidth',
        rh: '$rheight'
    },
    share: {
        marginTop: 14,
    },
    img: {
        width: '$rwidth * 75',
        height: '$rwidth * 75',
    },
    h1: {

    }
})
const BasicView = styled.View`
marginTop:14px;
`;