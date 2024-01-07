import EStyleSheet from 'react-native-extended-stylesheet';
import Lottie from 'lottie-react-native';

export default ({ navigation }) => {
    return <Lottie
        source={require('../../asset/Process.json')}
        autoPlay
        loop={false}
        onAnimationFinish={() => navigation.navigate("Home")} />
}
