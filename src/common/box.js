import styled from 'styled-components/native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { initialWindowMetrics } from 'react-native-safe-area-context';



export const CenterView = styled.View`
align-items: center;
flex:1;
justify-content:center;
`;

export const RowSpread = styled.View`
align-items: center;
flex-direction:row;
justify-content:space-between;
`;
export const RowView = styled.View`
align-items: center;
flex-direction:row;
`;

export const setStyle = EStyleSheet.create({
    $rw: '$rwidth',
    $rh: '$rheight',
    $safeTop: initialWindowMetrics.insets.top,
    _store: {
        imgTop: {
            height: '$rw * 80',
        },
        header: {
            paddingTop: ('$rh *2' +' $safeTop'),
            safe: '$safeTop'
        }
    },
})