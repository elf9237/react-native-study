import React from 'react';
import {
    Text,
    View,
    Button,
} from 'react-native';

export default class SecondScreen extends React.Component {
    static navigationOptions = {
        title: 'SecondScreen with Lucy',
    };
    render() {
        return (
            <View>
                <Text>Screen with Lucy</Text>
            </View>
        );
    }
}
