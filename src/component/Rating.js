import EStyleSheet from 'react-native-extended-stylesheet';
import { View, Text } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
export default ({ star, size }) => {
    const star_table = [
        'star-o',
        'star-half-empty',
        'star'
    ]
    const color = '#fea11c'
    const full_star = star === 5 ? 5 : Math.floor(star % 5)
    const adjust_star = star - full_star
    const empty_star = adjust_star ? 4 - full_star : 5 - full_star

    return <View style={{
        flexDirection: 'row'
    }}>
        {full_star != null && new Array(full_star).fill(2).map((e, i) => <FontAwesome name={star_table[e]} size={size} color={color} key={i + 's'} />)}
        {adjust_star != null && adjust_star >= 0.5 && <FontAwesome name={star_table[1]} size={size} color={color} />}

        {empty_star != null && empty_star != 0 && new Array(empty_star).fill(0).map((e, i) => <FontAwesome name={star_table[e]} size={size} color={color} key={i + 'e'} />)}
    </View>
}
const styles = EStyleSheet.create({
    _va: {
        unit: '1rem',
        rw: '$rwidth'
    }
})