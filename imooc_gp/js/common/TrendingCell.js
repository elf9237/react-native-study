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
        this.state = {
            isFavorite: this.props.projectModel.isFavorite,
            favoriteIcon: this.props.projectModel.isFavorite ? 
                require('../../res/images/ic_star.png') : require('../../res/images/ic_unstar_transparent.png')
        };
    }
    componentWillReceiveProps(nextProps) {
        console.log('nextProps.projectModel');
        console.log(nextProps.projectModel);
        this._setFavoriteState(nextProps.projectModel.isFavorite);
    }
    _setFavoriteState = (isFavorite) => {
        // this.props.projectModel.isFavorite = isFavorite;
        this.setState({
            isFavorite,
            favoriteIcon: isFavorite ? require('../../res/images/ic_star.png') : require('../../res/images/ic_unstar_transparent.png'),
        });
    }
    _onPressFavorite = () => {
        this._setFavoriteState(!this.state.isFavorite);
        this.props.onFavorite(this.props.projectModel.item, !this.state.isFavorite);
    }
    render() {
        let data = this.props.projectModel.item;
        let description = `<p>`+data.description+`</p>`;
        let favoriteButton = <TouchableOpacity 
            onPress={() => this._onPressFavorite()}
        >
            <Image 
                source={this.state.favoriteIcon} 
                style={{
                    width: 22,
                    height: 22,
                    tintColor: '#2196f3'
                }}
            />
        </TouchableOpacity>;
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
                                />;
                            })
                        }
                    </View>
                    {favoriteButton}
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
