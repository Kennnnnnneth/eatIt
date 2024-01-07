import EStyleSheet from 'react-native-extended-stylesheet';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Header from "../screen/Home/Header"
import TabBar from './TabBar'
import Home from '../screen/Home'
import Store from "../screen/Store"
import Order from "../screen/Order"
import Profile from "../screen/Profile"
const { Navigator, Screen, Group } = createBottomTabNavigator();

export default TopNest = () => {
    return <Navigator
        tabBar={(props) => <TabBar {...props} />}
        initialRouteName='Home'
    >
        <Screen name='Home' component={Home} options={{ headerShown: false }} />
        <Screen name="Store" component={Store} options={{ headerShown: false, unmountOnBlur: true }} />
        <Screen name="Order" component={Order} options={{ headerShown: false, unmountOnBlur: true }} />
        <Screen name='Profile' component={Profile} options={{ headerShown: false }} />
    </Navigator>
}
const styles = EStyleSheet.create({
    _va: {
        unit: '1rem',
        rw: '$rwidth'
    }
})