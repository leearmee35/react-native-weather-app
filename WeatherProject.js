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

import Forecast from './Forecast';

class WeatherProject extends React.Component{

    constructor(props){
        super(props)
        this.state={
            zip: 'Zip Code',
            forecast: {
                location: 'Los Angeles',
                description: 'Partly Cloudy !',
                temp: '65'
            }
        }
    }


    render(){
        return(
            <Image source={require('./img/background.jpg')} resizeMode='cover'  style={{flex: 1, flexDirection: 'column', marginTop: 20, height: 400, width: 400,}}>
                <View style={{
                    flex: 1,
                    width:400,
                    alignSelf: 'stretch',
                }}>
                    <View style={styles.container}>
                        <View style={{
                            flexDirection: 'row',
                            marginTop: 20,
                            marginBottom: 30,
                        }}>
                            <Text style={{
                                color: '#ffffff',
                            }}>Ian's Weather Forecast for</Text>

                            <View style={{
                                marginLeft: 10,
                                height: 20,
                                borderBottomColor: '#ffffff',
                                borderBottomWidth: 1 }}
                            >
                                <TextInput
                                    style={{
                                        width: 60,
                                        height: 20,
                                        fontSize: 14,
                                        color: '#ffffff',
                                    }}
                                    onChangeText={(zip)=>{
                                        console.log('hihihihi')
                                        this.setState({
                                            zip: zip,
                                        })
                                    }}
                                    onFocus={()=>this.setState({zip: ''})}
                                    onSubmitEditing={(e)=>{
                                        var zip = e.nativeEvent.text;
                                        this.setState({
                                            zip: e.nativeEvent.text,
                                        });

                                        fetch('https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22'+zip+'%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys')
                                            .then((response) => {
                                                return response.json()
                                            })
                                            .then((responseJson) => {
                                                console.log('hihihihihihi')
                                                console.log(responseJson)
                                                this.setState({
                                                    forecast:{
                                                        location: responseJson.query.results.channel.location.city,
                                                        description: responseJson.query.results.channel.item.condition.text,
                                                        temp: responseJson.query.results.channel.item.condition.temp,
                                                    }
                                                })
                                            })
                                            .catch((error) => {
                                                console.log('hihihifffff')
                                                console.error(error);
                                            });
                                    }}
                                    value={this.state.zip}
                                    returnKeyType="go"
                                    keyboardAppearance="dark"
                                />
                            </View>


                        </View>

                        <Forecast
                            main={this.state.forecast.location}
                            description={this.state.forecast.description}
                            temp={this.state.forecast.temp}
                        />

                    </View>

                </View>

            </Image>
        )
    }
}


var styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0.74,
        backgroundColor: '#4d4d4d',
        paddingTop: 20,
    },
    input: {
        fontSize: 20,
        borderWidth: 2,
        height: 40
    }
})

module.exports = WeatherProject