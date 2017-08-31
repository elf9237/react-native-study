import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    Text,
    Image,
    TouchableOpacity,
} from 'react-native';
import HTMLView from 'react-native-htmlview';

export default class TrendingCell extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        let data = this.props.data;
        let description = `<p>`+data.description+`</p>`;
        return <TouchableOpacity
            onPress={this.props.onSelect}
            style={styles.container}
        >
            <View style={styles.cell_container}>
                <Text style={styles.title}>{data.fullName}</Text>
                {/* <Text style={styles.description}>{data.description}</Text> */}
                <HTMLView
                    value={description}
                    onLinkPress={(url) => {}}
                    stylesheet={{
                        p: styles.description,
                        a: styles.description
                    }}
                />
                <Text style={styles.description}>{data.meta}</Text>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                }}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <Text style={styles.author}>Build by:</Text>
                        {
                            data.contributors.map((result, i , arr) => {
                                return <Image source={{
                            uri: arr[i]
                        }} style={{
                            width: 22,
                            height: 22,
                            marginLeft: 5,
                        }}
                        key={i}
                        />
                            })
                        }
                        
                    </View>
                    <Image source={require('../../res/images/ic_star.png')} style={{
                        width: 22,
                        height: 22
                    }}/>
                </View>
            </View>
        </TouchableOpacity>;
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
    },
    author: {
        fontSize: 14,
        color: '#757575',
        marginBottom: 5,
    },
});
