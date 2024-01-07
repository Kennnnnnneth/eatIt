import EStyleSheet from 'react-native-extended-stylesheet';
import { View, Text, FlatList } from 'react-native';


import { HEADER_HEIGHT } from '../../../common/config';
export default () => {
    return <View>
        {/* <View style={{
            height: styles._va.rw * HEADER_HEIGHT
        }} /> */}
       
        {
            [0, 1, 2, 3, 4, 5].map((e) => <View style={{
                height: styles._va.rh * 20,
            }} key={e + '1'} >
                <Text>{e}</Text>
            </View>)
        }
    </View>
}
const styles = EStyleSheet.create({
    _va: {
        unit: '1rem',
        rw: '$rwidth',
        rh: '$rheight'
    }
})