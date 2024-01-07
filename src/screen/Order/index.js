
import { View, Text } from 'react-native';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import { AntDesign } from '@expo/vector-icons';

import OrderPage from "./OrderPage"
import Detail from "./Detail"
import Process from './Process';
const { Navigator, Screen } = createSharedElementStackNavigator();
export default () => {
    return <Navigator
        initialRouteName='OrderPage'
        screenOptions={{

            cardOverlayEnabled: true,
            cardStyle: {
                backgroundColor: 'transparent'
            },
            cardStyleInterpolator: ({ current: { progress } }) => {
                return {
                    cardStyle: {
                        opacity: progress
                    }
                }
            }
        }}
    >
        <Screen name='OrderPage' component={OrderPage} options={{ headerShown: false }} />
        <Screen name='Detail' component={Detail} options={{ headerShown: false }}
            sharedElements={(route) => {
                const { shareID } = route.params
                return [shareID]
            }}
        />
        <Screen name={'Process'} component={Process} options={{ headerShown: false }} />
    </Navigator>
}
