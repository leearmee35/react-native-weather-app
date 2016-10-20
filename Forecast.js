/**
 * Created by JeffLee on 10/16/16.
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TextInput,
    Image,

} from 'react-native';

class Forecast extends React.Component{

    render(){
        return(
            <View>
                <Text style={styles.bigText}>
                    {this.props.main}
                </Text>
                <Text style={styles.mainText}>
                    Current Conditions: {this.props.description}
                </Text>
                <Text style={styles.bigText}>
                    {this.props.temp} °F
                </Text>
            </View>
        )
    }
}

var styles = StyleSheet.create({
    bigText:{
        flex: 2,
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        color: '#ffffff',
    },
    mainText: {
        flex: 1.5,
        fontSize: 16,
        textAlign: 'center',
        color: '#ffffff'
    }
})

module.exports = Forecast;