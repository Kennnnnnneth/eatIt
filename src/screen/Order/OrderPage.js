import EStyleSheet from 'react-native-extended-stylesheet';
import { View, Text, SafeAreaView, SectionList, TouchableOpacity, Image, FlatList, TouchableWithoutFeedback } from 'react-native';
import { SharedElement } from 'react-navigation-shared-element';
import { nanoid } from "@reduxjs/toolkit"
import Animated, { FadeInLeft, interpolate, useAnimatedScrollHandler, useAnimatedStyle, useDerivedValue, useSharedValue, withRepeat, withSpring, withTiming } from 'react-native-reanimated';
import { useSelector } from 'react-redux';
import Svg, { Path } from "react-native-svg"


import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

import { RowSpread, RowView } from '../../common/box';
import data from "./fakeData"
import foodimg from "./getImg"
import { getCart } from "../../store/Slice/cart"
import { useEffect, useMemo, useRef } from 'react';
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { ORDER_METHORD } from '../../common/config';
import { formatter } from '../../common/config';
export default ({ route, navigation, }) => {
    const storeName = navigation.getParent().params
    const cart_ref = useRef()
    // const x = route.params?.x || []


    return <SafeAreaView style={{
        backgroundColor: '#fff',
    }}>
        <SectionList
            sections={data}
            style={{
                overflow: 'visible'
            }}
            showsVerticalScrollIndicator={false}
            stickySectionHeadersEnabled={false}
            ListHeaderComponent={() => <Info name={storeName} />}
            ItemSeparatorComponent={() => <View style={{
                height: styles._va.rh * 5
            }} />}
            renderSectionHeader={({ section: { title } }) => <SectionHeader item={title} />}
            renderItem={({ item, section }) => <Section items={item} click={navigation} cart={cart_ref} />}
        />
        <Cart theRef={cart_ref} navigation={navigation} />
        <Back click={navigation} />
    </SafeAreaView>
}
const Back = ({ click }) => {
    return <View style={{
        position: 'absolute',
        top: 65,
        left: '4%'
    }}>
        <AntDesign.Button name="arrowleft" size={24} color="black" iconStyle={{ marginRight: 0 }} backgroundColor={'#f0f0f0'} onPress={() => click.goBack()} />
    </View>
}
const Info = ({ name }) => {
    console.log(name)
    return <View style={{ marginTop: 10, alignItems: 'center' }}>
        <Text style={{
            fontSize: 30,
            fontWeight: '500'
        }}>{'What would you like '}</Text>
        <Text style={{
            fontSize: 24,
            fontWeight: '300'
        }}>{'in ' + 1}</Text>
    </View>
}
const SectionHeader = ({ item }) => {
    return <View style={{
        padding: 4,
        marginVertical: 10,
        backgroundColor: '#fff',
        marginLeft: '4%'
    }}>
        <Text style={{
            fontSize: 30,
            fontWeight: '600'
        }}>{item}</Text>
    </View>
}
const Section = ({ items, click, cart }) => {
    return <View style={{
        alignItems: 'center',
    }}>
        <View style={styles.sectionItemContainer}>
            {
                items.map((item, index) => {
                    const { name, price, img, category, star, id } = item
                    const uuid = nanoid()
                    return <TouchableOpacity key={nanoid()} onPress={() => {
                        click.navigate('Detail', { shareID: uuid, img: foodimg[img], name: name, price: price, star: star, id: id, category: category, method: ORDER_METHORD.CREATED })
                    }}><Animated.View>
                            <View style={{
                                height: styles._va.rw * 15
                            }} />
                            <Animated.View style={[{
                                backgroundColor: '#e1e1e3',
                                borderRadius: styles._va.rw * 4
                            }, styles._sectionItem.img]} />
                            <View style={{
                                position: 'absolute',
                                left: styles._va.rw * 2.5
                            }}>
                                <SharedElement id={uuid} >
                                    <Image
                                        style={{
                                            width: styles._va.rw * 30,
                                            height: styles._va.rw * 30
                                        }}
                                        source={foodimg[img]}
                                    />
                                </SharedElement>
                            </View>
                            <View style={{
                                position: 'absolute',
                                bottom: 0,
                                alignItems: 'center',
                                width: styles._va.rw * 35,
                            }}>
                                <Text style={{
                                    fontSize: 18,
                                    fontWeight: '600',
                                    paddingBottom: 4
                                }}>{name}</Text>
                                <Text style={{
                                    fontSize: 13,
                                    color: '#969699',
                                    paddingBottom: 4
                                }}>{category}</Text>
                                <Text style={{
                                    fontSize: 15,
                                    color: '#424242',
                                    paddingBottom: 4
                                }}>{'$ ' + price}</Text>
                                <View style={{ height: 10 }} />
                            </View>
                        </Animated.View></TouchableOpacity>
                })
            }
        </View>
    </View>
}
const Cart = ({ theRef, navigation }) => {
    const full_cart = useSelector(getCart)
    const snapPoints = useMemo(() => ['10%', '80%'], [])
    const scroll = useSharedValue(0)


    const TitleFade = useAnimatedStyle(() => {
        const opacity = interpolate(scroll.value, [812 * (1 - 0.12), 812 * (1 - 0.60)], [1, 0], 'clamp')
        return {
            opacity
        }
    }, [scroll])
    const TitleDrop = useAnimatedStyle(() => {
        const translateY = interpolate(scroll.value, [812 * (1 - 0.12), 812 * (1 - 0.60)], [0, 30], 'clamp')
        const translateX = interpolate(scroll.value, [812 * (1 - 0.12), 812 * (1 - 0.60)], [0, 50], 'clamp')
        const scale = interpolate(scroll.value, [812 * (1 - 0.12), 812 * (1 - 0.60)], [1, 1.5], 'clamp')
        return {
            transform: [
                { translateY },
                { translateX },
                { scale }
            ]
        }
    }, [scroll])

    const TopIcon = ({ item }) => {
        const { img } = item
        return <Animated.View entering={FadeInLeft}>
            <Image source={img} style={{ width: 30, height: 30, borderRadius: 30 }} />
        </Animated.View>
    }
    const Footer = ({ list }) => {
        return <View style={{
            alignItems: 'center',
        }}>
            <RowSpread style={{ width: '80%', marginVertical: 10 }}>
                <Text style={{
                    fontSize: 28,
                    color: "#c4c1c0",
                    fontWeight: '300'
                }}>{"Total"}</Text>
                <Text style={{
                    fontSize: 38,
                    color: '#fff',
                    fontWeight: '500'
                }}>{formatter.format(list?.reduce((pre, cur) => pre + (cur.price + cur.type.value), 100))}</Text>
            </RowSpread>
            <TouchableWithoutFeedback onPress={() => {
                navigation.navigate("Process")
            }}>
                <View style={{
                    width: '80%',
                    backgroundColor: '#1A73E8', alignItems: 'center',
                    borderRadius: 44
                }}>
                    <Text style={{ color: '#fff', fontSize: 24, padding: 10 }}>{'Next'}</Text>
                </View>
            </TouchableWithoutFeedback>
            <View style={{ height: 20 }} />
        </View>
    }
    return <BottomSheet
        snapPoints={snapPoints}
        ref={theRef}
        index={0}
        animatedPosition={scroll}
        // containerStyle={{
        //     backgroundColor: '#000' 
        // }}
        // onChange={(index) => {
        //     console.log("orderPage cart")
        //     //at the end
        // }}
        onAnimate={() => {
            // console.log("orderPage cart")
            //begin
        }}
        backgroundStyle={{
            backgroundColor: '#231f20',

        }}
        handleComponent={() => {
            return <View>
                <View style={{ width: '100%', height: 20, backgroundColor: '#231f20' }} />
                <RowSpread style={{
                    width: '100%',
                    position: 'absolute',
                    top: -30
                }}>
                    <Svg height={50} width={60}>
                        <Path
                            d="m0,0v50c20.02.03,40.05.06,60.07.09,0-6.72,0-13.43,0-20.15-4.27-.16-10.6-.45-18.26-1.04-22.76-1.76-26.57-3.77-28.48-4.99C10.44,22.07,2.75,16.26,0,0Z"
                            fill={'#231f20'}
                            stroke={"none"}
                        />
                    </Svg>
                    <Svg height={50} width={60}>
                        <Path
                            d="m60.07,0v50c-20.02.03-40.05.06-60.07.09,0-6.72,0-13.43,0-20.15,4.27-.16,10.6-.45,18.26-1.04,22.76-1.76,26.57-3.77,28.48-4.99,2.88-1.83,10.57-7.65,13.32-23.91Z"
                            fill={'#231f20'}
                            stroke={"none"}
                        />
                    </Svg>
                </RowSpread>
            </View>
        }}
        footerComponent={() => <Footer list={full_cart} />}
    >
        <BottomSheetScrollView
        ><View style={{ paddingHorizontal: '4%' }}>
                <View style={{ height: 60, flexDirection: 'row' }}>
                    <Animated.View style={TitleDrop}>
                        <Text style={{ color: '#fff', fontSize: 30, marginRight: 10 }}>{"Cart"}</Text>
                    </Animated.View>
                    {
                        full_cart !== undefined && <Animated.View style={TitleFade}>
                            <FlatList
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                data={full_cart.reverse()}
                                ItemSeparatorComponent={<View style={{ width: 8 }} />}
                                renderItem={({ item }) => <TopIcon item={item} />}
                            />
                        </Animated.View>
                    }
                </View>
            </View>


            <View style={{ alignItems: 'center', marginTop: 0 }}>
                <View style={{ width: '85%' }}>

                    {
                        full_cart !== undefined && full_cart.reverse().map((item, index) => {
                            const { img, quantity, name, price, type } = item
                            return <View key={nanoid()}
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    marginVertical: 20
                                }}>
                                <Image source={img} style={{ width: 65, height: 65 }} />
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                }}>
                                    <Text style={{ color: '#fff', width: 30, fontSize: 15 }}>{`${quantity} x `}</Text>
                                    <Text style={{ color: '#fff', fontSize: 18, textTransform: 'capitalize' }}>{name}</Text>
                                </View>
                                <Text style={{ color: '#888a89', fontSize: 15 }}>{formatter.format(price + type.value)}</Text>
                            </View>
                        })
                    }
                    {
                        full_cart !== undefined && <RowSpread style={{ marginVertical: 20 }}>
                            <FontAwesome name="car" size={24} color="#1A73E8" style={{ marginLeft: 15 }} />
                            <Text style={{ color: '#fff', fontSize: 18, textTransform: 'capitalize' }}>{'Delivery'}</Text>
                            <Text style={{ color: '#888a89', fontSize: 15 }}>{formatter.format(100)}</Text>
                        </RowSpread>
                    }
                    <View />
                </View>

            </View>



        </BottomSheetScrollView>
    </BottomSheet>
}
const styles = EStyleSheet.create({
    _va: {
        unit: '1rem',
        rw: '$rwidth',
        rh: '$rheight'
    },
    sectionItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '90%'
    },
    _sectionItem: {
        img: {
            width: '$rwidth * 35',
            height: '$rwidth * 35',
        },
        name: {
            fontSize: 22,
        },
        price: {

        }
    }
})