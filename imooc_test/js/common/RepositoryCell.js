import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    Text,
    Image,
    TextInput,
    ListView,
    TouchableOpacity,
} from 'react-native';

export default class RepositoryCell extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <TouchableOpacity
            style={styles.container}
          >
        <View style={styles.cell_container}>
            <Text style={styles.title}>{this.props.data.full_name}</Text>
            <Text style={styles.description}>{this.props.data.description}</Text>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between'
            }}>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                    <Text>Author:</Text>
                    <Image source={{
                        uri: this.props.data.owner.avatar_url
                    }} style={{
                        width: 22,
                        height: 22
                    }}/>
                </View>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                    <Text>Stars:</Text>
                    <Text>{this.props.data.stargazers_count}</Text>
                </View>
                <Image source={require('../../res/images/ic_star.png')} style={{
                    width: 22,
                    height: 22
                }}/>
            </View>
        </View>
        </TouchableOpacity>
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        fontSize: 16,
        color: '#212121',
        marginBottom: 5
    },
    description: {
        fontSize: 14,
        color: '#757575',
        marginBottom: 5,
        borderRadius: 2
    },
    cell_container:{
      backgroundColor:'white',
      padding:10,
      marginLeft:5,
      marginRight:5,
      borderWidth:0.5,
      marginVertical:3,
      borderRadius:5,
      borderColor:'#ddd',
      // ios阴影效果
      shadowColor:'gray',
      shadowOffset:{width:0.5,height:0.5},
      shadowOpacity:0.4,
      shadowRadius:1,
      // android下阴影效果,5.0以上有效果
      elevation:2
    }
})
