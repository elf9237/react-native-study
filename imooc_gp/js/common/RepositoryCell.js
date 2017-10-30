import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    Text,
    Image,
    TouchableOpacity,
} from 'react-native';

export default class RepositoryCell extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFavorite: this.props.projectModel.isFavorite,
            favoriteIcon: this.props.projectModel.isFavorite ? 
                require('../../res/images/ic_star.png') : require('../../res/images/ic_unstar_transparent.png')
        };
    }
    componentWillReceiveProps(nextProps) {
        console.log('RepositoryCell');
        this._setFavoriteState(nextProps.projectModel.isFavorite);
    }
    _setFavoriteState = (isFavorite) => {
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
        let item = this.props.projectModel.item ? this.props.projectModel.item : this.props.projectModel;
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
        >
            <View style={styles.cell_container}>
                <Text style={styles.title}>{item.full_name}</Text>
                <Text style={styles.description}>{item.description}</Text>
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
                            uri: item.owner.avatar_url
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
                        <Text>{item.stargazers_count}</Text>
                    </View>
                    {favoriteButton}
                </View>
            </View>
        </TouchableOpacity>;
    }
}

const styles = StyleSheet.create({
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
});

