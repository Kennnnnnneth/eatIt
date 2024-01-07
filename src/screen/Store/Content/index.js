import EStyleSheet from 'react-native-extended-stylesheet';
import styled from 'styled-components/native';

import { StyleSheet, View, Text, Pressable, FlatList, ScrollView, Image, ImageBackground, TouchableWithoutFeedback } from "react-native"
import { useRef } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Animated, { FadeIn, FadeInLeft, interpolate, useAnimatedScrollHandler, useAnimatedStyle } from 'react-native-reanimated';
import BottomSheet from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';

import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';


import { RowSpread, RowView, setStyle } from '../../../common/box';
import Rating from "../../../component/Rating"
import { followColor, food } from '../../../common/config';

export default ({ output, theRef, data, y_menu, y_info, y_review }) => {
    const insets = useSafeAreaInsets();
    const scrollHandler = useAnimatedScrollHandler((e) => {
        output.value = e.contentOffset.y
    })
    const detailDayRef = useRef()
    return <Animated.ScrollView
        ref={theRef}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        style={[StyleSheet.absoluteFill, { flex: 1 }]}
        showsVerticalScrollIndicator={false}
    >
        <ImgHolder />
        <BasicInfo data={data} sheetRef={detailDayRef} />
        <Event />
        <View style={{ height: 34, marginTop: 8 }} />
        <Menu y_menu={y_menu} data={data} />
        <OverView data={data} y_info={y_info} />
        <AdditionInfo />
        <Review data={data} y_review={y_review} />

        {/* <DetailDay openDay={data.hours[0].open} sheetRef={detailDayRef} /> */}
        <View style={{ height: insets.bottom, backgroundColor: '#fff' }} />
    </Animated.ScrollView>
}

const BasicInfo = ({ data, sheetRef }) => {
    const { categories, price, hours, review_count, location, phone, url } = data

    return <View style={styles.container}>
        {/* price, is_open_now, review_count */}

        <BasicView><Animated.View entering={FadeIn}>
            <RowSpread style={{ width: 170, height: 15 }}>
                <RowView>
                    <FontAwesome5 name="coins" size={14} color="#c2c0c0" />
                    <Text style={styles.p}>{price}</Text>
                </RowView>
                <RowView>
                    <AntDesign name="isv" size={14} color="#c2c0c0" />
                    <Text style={styles.p}>{hours[0].is_open_now ? 'Open' : 'Close'}</Text>
                </RowView>
                <RowView>
                    <Entypo name="text-document" size={14} color="#c2c0c0" />
                    <Text style={styles.p}>{review_count}</Text>
                </RowView>
            </RowSpread></Animated.View></BasicView>

        <BasicView><FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={categories}
            style={{ overflow: 'visible', paddingBottom: 8 }}
            renderItem={({ item, index }) => <Animated.View
                entering={FadeInLeft.delay(index * 100)}
                style={{
                    padding: 8,
                    backgroundColor: followColor[index],
                    borderRadius: 32,
                    marginLeft: 8,
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5,
                }}>
                <View style={{ height: 19 }}><Text style={{
                    fontSize: 18,
                    fontWeight: '600',
                }}>{item.title}</Text></View></Animated.View>
            }
        /></BasicView>

    </View>
}
const Event = () => {
    const data = [
        {
            img: 'https://static01.nyt.com/images/2023/05/18/multimedia/18Make-ahead-salads1-hqlc/19Make-ahead-salads1-hqlc-threeByTwoMediumAt2X.jpg',
            slogan: 'Buy one get one free'
        },
        {
            img: 'https://www.cnet.com/a/img/resize/989e8e3be4eb8baae522f982b7cc1f6a3f4c0f6d/hub/2022/12/14/8af299d7-0c8f-493f-9771-c5b4738cb690/gettyimages-1306753442.jpg?auto=webp&fit=crop&height=675&width=1200',
            slogan: 'No delievery free(spent $40)'
        },
        {
            img: 'https://a.cdn-hotels.com/gdcs/production24/d1597/4f3f77cf-bdca-4ec3-af5d-ea923d74f672.jpg?impolicy=fcrop&w=800&h=533&q=medium',
            slogan: '75% off on selected items'
        }
    ]
    return <View style={{
        backgroundColor: '#fff',
        marginTop: 8,
        paddingVertical: 14
    }}>
        <View style={styles.title}><View style={{ height: 29 }}>
            <Text style={styles.h1}>{"Event & Coupon"}</Text></View></View>
        <FlatList
            data={data}
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToInterval={styles._va.rw * 84}
            decelerationRate="fast"
            style={styles.ad_container}
            renderItem={({ item }) => <View style={styles.ad_view}>
                <Image source={{ uri: item.img }} style={styles.ad_img} />
                <View style={{
                    position: 'absolute',
                    backgroundColor: '#1A73E8',
                    padding: 8,
                    borderBottomRightRadius: 31,
                    borderTopRightRadius: 31,
                    top: 8,
                }}><Text style={{
                    fontSize: 15,
                    color: '#fff',
                    fontWeight: '600'
                }}>{item.slogan}</Text></View>
            </View>}
        />
    </View>

}
const Menu = ({ y_menu, data }) => {
    const navigation = useNavigation();

    return <DetailView
        style={{ paddingLeft: 14 }}
        onLayout={(e) => {
            const { y } = e.nativeEvent.layout;
            y_menu.value = y
        }}
    >
        <View><Text style={styles.h1}>{'Menu'}</Text></View>
        <BasicView><Text style={styles.h2}>{'Main dishes'}</Text></BasicView>
        <FlatList
            data={food.slice(0, 6)}
            horizontal
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={<View style={{ width: 12 }} />}
            style={{ overflow: 'visible', marginTop: 8 }}
            renderItem={({ item }) => <View style={{
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
                backgroundColor: '#fff'
            }}>
                <Image source={{ uri: item.img }} style={{ width: styles._va.rw * 60, height: styles._va.rw * 45, borderRadius: 8 }} />
                <Text style={[styles.h2, { color: '#000', marginTop: 8 }]}>{item.name}</Text>
            </View>}
        />
        <View style={{
            alignContent: "center",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 8,
        }}>
            <TouchableWithoutFeedback onPress={() => navigation.navigate("Order", { storeName: data.name || 'None' })}>
                <View style={{
                    width: 250,
                    backgroundColor: '#1A73E8',
                    padding: 10,
                    borderRadius: 20.5,
                }}>
                    <View style={{
                        height: 21,
                        alignContent: "center",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                    ><Text style={[styles.h2, { color: '#fff' }]}>{"Order Now"}</Text></View></View></TouchableWithoutFeedback>
        </View>

    </DetailView>
}
const OverView = ({ data, y_info }) => {
    const { categories, price, hours, review_count, location, phone, url } = data
    const day = new Date().getDay()
    const convertedDay = day === 0 ? 6 : day - 1
    const covertUrl = url.length > 20 ? url.slice(0, 30) + '...' : url
    return <DetailView
        onLayout={(e) => {
            const { y } = e.nativeEvent.layout;
            y_info.value = y
        }}
    >
        <View style={styles.title}><View style={{ height: 29 }}><Text style={styles.h1}>{'Overview'}</Text></View></View>
        {/* location,phone,openTime,price */}
        <View style={{
            alignContent: "center",
            alignItems: "center",
            justifyContent: "center",
        }}>
            <View style={{
                width: '80%',
            }}>
                <View style={{
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    height: 60,
                }}>
                    <Entypo name="location" size={24} color="#1A73E8" />
                    <Text style={styles.overText} selectable={true}>{location.formatted_address}</Text>
                    <View />
                </View>
                <View style={styles.overView}>
                    <MaterialCommunityIcons name="clipboard-clock-outline" size={24} color="#1A73E8" />
                    <Text style={styles.overText}>
                        <Text>{hours[0].is_open_now ? hours[0].open[convertedDay].start.slice(0, 2) + ':' + hours[0].open[convertedDay].start.slice(2) + '~' + hours[0].open[convertedDay].end.slice(0, 2) + ":" + hours[0].open[convertedDay].end.slice(2) : 'Close '}</Text>
                    </Text>
                    <View />
                </View>
                <View style={styles.overView}>
                    <MaterialCommunityIcons name="phone-ring-outline" size={24} color="#1A73E8" />
                    <Text style={styles.overText}>{phone}</Text>
                    <View />
                </View>
                <View style={styles.overView}>
                    <MaterialCommunityIcons name="web" size={24} color="#1A73E8" />
                    <Text style={styles.overText}>{covertUrl}</Text>
                    <View />
                </View>
            </View>
        </View>
    </DetailView>
}
const AdditionInfo = () => {

    return <DetailView>
        <View style={{
            alignContent: "center",
            alignItems: "center",
            justifyContent: "center",
        }}>
            <View style={{ width: '85%' }}>

                <View style={{}}>
                    <RowSpread>
                        <Text style={styles.Add_title}>{"Amenities"}</Text>
                        <Feather name="arrow-right" size={20} color="black" />
                    </RowSpread>
                    <View style={{ marginTop: 20 }}>
                        <AddRowView>
                            <Feather name="check" size={24} color="black" style={styles.Add_icon} />
                            <AddText>{'Mask required'}</AddText>
                        </AddRowView>
                        <AddRowView>
                            <Feather name="check" size={24} color="black" style={styles.Add_icon} />
                            <AddText>{'Staff wears masks'}</AddText>
                        </AddRowView>
                    </View>
                </View>
                <View style={[styles.AddView]}>
                    <Text style={styles.Add_title}>{"Payment"}</Text>
                    <View style={{ marginTop: 20 }}>
                        <AddRowView>
                            <FontAwesome5 name="apple" size={24} color="black" style={styles.Add_icon} />
                            <AddText>{'Accept Apple Pay'}</AddText>
                        </AddRowView>
                        <AddRowView>
                            <FontAwesome5 name="google" size={24} color="black" style={styles.Add_icon} />
                            <AddText>{'Accept Google pay'}</AddText>
                        </AddRowView>
                        <AddRowView>
                            <AntDesign name="wechat" size={24} color="black" style={styles.Add_icon} />
                            <AddText>{'Accept Wechat pay'}</AddText>
                        </AddRowView>
                    </View>
                </View>
                <View style={[styles.AddView]}>
                    <RowSpread>
                        <Text style={styles.Add_title}>{"Features"}</Text>
                        <Feather name="arrow-right" size={24} color="black" />
                    </RowSpread>
                    <View style={{ marginTop: 20 }}>
                        <AddRowView>
                            <MaterialCommunityIcons name="patio-heater" size={24} color="black" style={styles.Add_icon} />
                            <AddText>{'Patio'}</AddText>
                        </AddRowView>
                        <AddRowView>
                            <MaterialCommunityIcons name="car-brake-parking" size={24} color="black" style={styles.Add_icon} />
                            <AddText>{'Private Lot Parking'}</AddText>
                        </AddRowView>
                    </View>
                </View>

            </View>
        </View>
    </DetailView>
}
const Review = ({ data, y_review }) => {
    const { reviews, review_count, rating } = data
    const commend_sign = (rating) => ({
        fontSize: 18,
        color: rating < 2.5 ? "#dc782b" : rating >= 4 ? '#27be59' : "#936A50"
    })
    return <DetailView
        onLayout={(e) => {
            const { y } = e.nativeEvent.layout;
            y_review.value = y
        }}
    >
        <View style={styles.title}><View style={{ height: 29 }}><Text style={styles.h1}>{'Reviews'}</Text></View></View>

        <View style={{ paddingHorizontal: 14 }}>
            <RowSpread>
                <View>
                    <Text style={styles.h2}>{'Recent Reviews: '}</Text>
                    <Text>
                        <Text style={[commend_sign(rating), {
                            fontSize: 20,
                            fontWeight: '800'
                        }]}>{rating < 2.5 ? 'Not Recommended' : rating >= 4 ? "Recommended" : "Mixed"}</Text>
                        <Text style={{
                            fontSize: 16,
                            fontWeight: '300'
                        }}>{` (${review_count} reviews)`}</Text>
                    </Text>
                </View>
                <View style={{
                    alignItems: 'center'
                }}>
                    <FontAwesome name="star" size={24} color="#fea11c" />
                    <Text>{rating}</Text>
                </View>
            </RowSpread>

        </View>

        <View style={{ paddingHorizontal: 14, marginTop: 8 }}>

            {
                reviews.map((e, i) => {
                    const { user, text, time_created, rating } = e
                    return <RowSpread key={i + 'r'} style={{
                        padding: 10
                    }}>
                        <Image source={{ uri: user.image_url ?? 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Blue_question_mark_icon.svg/800px-Blue_question_mark_icon.svg.png' }} style={{
                            width: 30,
                            height: 30,
                            borderRadius: 30,
                        }} />
                        <View style={{ width: styles._va.rw * 50 }}>
                            <Text >{'"' + text.slice(0, 70) + '..."'}</Text>
                            {/* years ago */}
                            <Text style={{
                                color: '#787878',
                                fontSize: 12
                            }}>{time_created}</Text>
                        </View>
                        <RowView style={{
                            marginRight: 8
                        }}>
                            <Rating star={rating} size={14} />
                        </RowView>
                    </RowSpread>
                })
            }
            {
                reviews.map((e, i) => {
                    const { user, text, time_created, rating } = e
                    return <RowSpread key={i + 'r'} style={{
                        padding: 10
                    }}>
                        <Image source={{ uri: user.image_url ?? 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Blue_question_mark_icon.svg/800px-Blue_question_mark_icon.svg.png' }} style={{
                            width: 30,
                            height: 30,
                            borderRadius: 30,
                        }} />
                        <View style={{ width: styles._va.rw * 50 }}>
                            <Text >{'"' + text.slice(0, 70) + '..."'}</Text>
                            {/* years ago */}
                            <Text style={{
                                color: '#787878',
                                fontSize: 12
                            }}>{time_created}</Text>
                        </View>
                        <RowView style={{
                            marginRight: 8
                        }}>
                            <Rating star={rating} size={14} />
                        </RowView>
                    </RowSpread>
                })
            }
            {
                reviews.map((e, i) => {
                    const { user, text, time_created, rating } = e
                    return <RowSpread key={i + 'r'} style={{
                        padding: 10
                    }}>
                        <Image source={{ uri: user.image_url ?? 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Blue_question_mark_icon.svg/800px-Blue_question_mark_icon.svg.png' }} style={{
                            width: 30,
                            height: 30,
                            borderRadius: 30,
                        }} />
                        <View style={{ width: styles._va.rw * 50 }}>
                            <Text >{'"' + text.slice(0, 70) + '..."'}</Text>
                            {/* years ago */}
                            <Text style={{
                                color: '#787878',
                                fontSize: 12
                            }}>{time_created}</Text>
                        </View>
                        <RowView style={{
                            marginRight: 8
                        }}>
                            <Rating star={rating} size={14} />
                        </RowView>
                    </RowSpread>
                })
            }
            {
                reviews.map((e, i) => {
                    const { user, text, time_created, rating } = e
                    return <RowSpread key={i + 'r'} style={{
                        padding: 10
                    }}>
                        <Image source={{ uri: user.image_url ?? 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Blue_question_mark_icon.svg/800px-Blue_question_mark_icon.svg.png' }} style={{
                            width: 30,
                            height: 30,
                            borderRadius: 30,
                        }} />
                        <View style={{ width: styles._va.rw * 50 }}>
                            <Text >{'"' + text.slice(0, 70) + '..."'}</Text>
                            {/* years ago */}
                            <Text style={{
                                color: '#787878',
                                fontSize: 12
                            }}>{time_created}</Text>
                        </View>
                        <RowView style={{
                            marginRight: 8
                        }}>
                            <Rating star={rating} size={14} />
                        </RowView>
                    </RowSpread>
                })
            }
        </View>


    </DetailView>
}
const ImgHolder = () => {
    return <View style={{ height: setStyle._store.imgTop.height }} />
}
const styles = EStyleSheet.create({
    _va: {
        rw: '$rwidth',
        unit: '1rem',
    },
    container: {
        paddingHorizontal: '$rwidth * 4',
        overflow: 'visible',
        backgroundColor: '#fff'
    },
    ad_container: {
        left: '$rwidth * 10',
        overflow: 'visible',
    },
    ad_view: {
        marginRight: '$rwidth * 4'
    },
    ad_img: {
        width: '$rwidth * 80',
        height: '$rwidth * 50',
        borderRadius: 20,
        resizeMode: 'cover',
    },
    ad_text: {

    },
    p: {
        fontSize: 14,
        color: '#c2c0c0',
        marginLeft: 4
    },
    hader_container: {
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 8,
    },
    overView: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderTopWidth: 1,
        borderColor: '#DADCE0',
        height: 60,
    },
    overText: {
        fontSize: 13,
        fontWeight: '500'
    },
    AddView: {
        borderTopWidth: 1,
        borderColor: '#DADCE0',
        paddingTop: 20,
    },
    Add_title: {
        fontSize: 20,
        fontWeight: '600'
    },
    Add_icon: {
        width: 24,
        position: 'absolute',
        left: 0
    },
    title: {
        marginLeft: 14,
        marginBottom: 14,
    },
    h1: {
        fontSize: 28,
        fontWeight: '600'
    },
    h2: {
        fontSize: 20,
        fontWeight: '600',
        color: '#787878'
    }
})

const BasicView = styled.View`
marginTop:8px;
background-color:#fff;
`;

const DetailView = styled.View`
marginTop:8px;
background-color:#fff;
padding-vertical:14px;
`;
const AddRowView = styled.View`
align-items: center;
justify-content:center;
margin-bottom:10px;
`;
const AddText = styled.Text`
margin-left:8px;
color: #787878;
font-size:18px;
`;
