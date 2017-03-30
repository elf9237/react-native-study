/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';

/**
*方式一：es6方式创建组件
*/
export default class FlexBoxComponent extends Component {
    render() {
        return (<View style={{
            flexDirection:'column',
            backgroundColor: "darkgray",
            marginTop: 20,
            flexWrap:'wrap',
            justifyContent:'space-around',
            height:500,
            alignItems:'stretch'
        }}>
            <View style={{
                flex:1,
                height:50,
                backgroundColor: "darkcyan",
                margin: 5
            }}>
                <Text style={{
                    fontSize: 16
                }}>1</Text>
            </View>
            <View style={{
                width: 50,
                height: 50,
                backgroundColor: "darkcyan",
                margin: 5
            }}>
                <Text style={{
                    fontSize: 16
                }}>2</Text>
            </View>
            <View style={{
                width: 50,
                height: 50,
                backgroundColor: "darkcyan",
                margin: 5
            }}>
                <Text style={{
                    fontSize: 16
                }}>3</Text>
            </View>
            <View style={{
                width: 50,
                height: 50,
                backgroundColor: "darkcyan",
                margin: 5
            }}>
                <Text style={{
                    fontSize: 16
                }}>4</Text>
            </View>
        </View>)
    }
}
