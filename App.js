import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux'
import store from "./src/store"
import Nav from './src/nav';
import { StatusBar } from 'expo-status-bar';

import { Amplify } from 'aws-amplify';
import {
  useAuthenticator,
  withAuthenticator,
} from '@aws-amplify/ui-react-native';
import awsExports from './src/aws-exports';

Amplify.configure(awsExports);

function App() {
  return <SafeAreaProvider>
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar />
        <Nav />
      </NavigationContainer>
    </Provider>
  </SafeAreaProvider>
}

export default withAuthenticator(App);


const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height
EStyleSheet.build({
  $rem: (10 * windowWidth / 393),
  $rhRatio: windowWidth / windowHeight,
  $rwidth: windowWidth * 0.01,
  $rheight: windowHeight * 0.01,
  $windowWidth: windowWidth,
  $windowHeight: windowHeight,
  $h1_s: '2.65rem',
  $h1_h: '3.5rem',
  $h2_s: '2.2rem',
  $h2_h: '2.75rem',
  $h3_s: '2rem',
  $h3_h: '2.7rem',
  $p1_s: '2.2rem',
  $p1_h: '2.75rem',
  $p2_s: '1.8rem',
  $p2_h: '2.45rem',
  $p3_s: '1.56rem',
  $p3_h: '2.2rem',
})