import EStyleSheet from 'react-native-extended-stylesheet';
import { View, Text, StyleSheet } from 'react-native';
import TopImg from './TopImg';
import { useEffect, useRef } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import IconTop from './IconTop';
import Tab from "./Tab"
import { setStyle } from '../../../common/box';
import { useSharedValue } from 'react-native-reanimated';
export default ({ y, img, name, rating, scroll, y_menu, y_info, y_review }) => {
    const insets = useSafeAreaInsets();
    const y1_tab = useRef(0)
    const y_tab_a = useSharedValue(0)
    const y1 = insets.top + (styles._va.rh * 2.5) + (styles._va.unit * 2.6)
    // y0={setStyle._store.imgTop.height + 80 + styles._va.rw * 50}
    return <View style={{
        position: 'absolute',
    }}>
        <TopImg y={y} img={img} name={name} rating={rating} />
        <IconTop y={y} name={name} tab_y_final={y1_tab} y_a={y_tab_a} />
        <Tab y0={setStyle._store.imgTop.height + 152 + 8 + styles._va.rw * 50} y1={y1_tab.current} yt={y} scrollView={scroll} y_menu={y_menu} y_info={y_info} y_review={y_review} y_a={y_tab_a} />
    </View>
}
const styles = EStyleSheet.create({
    _va: {
        unit: '1rem',
        rw: '$rwidth',
        rh: '$rheight'

    }
})