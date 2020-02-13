import React, { Component } from 'react';
import RNTextDetector from "react-native-text-detector";
import { View, Button, TouchableOpacity, Text, StyleSheet, Alert, Image, TextInput } from "react-native";
import { RNCamera } from 'react-native-camera';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconNew from 'react-native-vector-icons/Entypo';

import { showMessage } from "react-native-flash-message";
import AsyncStorage from '@react-native-community/async-storage';
import LinearGradient from 'react-native-linear-gradient';

var uri, detectedText;

export default class TextDetectionComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isCameraVisible: false,
            text: [],
            valueSet: '',
            codeEntered: ''
        }
    }

    /**
     * Submit the code to respected API link
     */
    onSubmitCode = async () => {
        await AsyncStorage.setItem('traceCode', JSON.stringify(this.state.valueSet))
        this.props.navigation.navigate('TraceDetails')
    }

    /**
     * capture picture and detect its text.
     */
    detectText = async () => {
        console.log("Hi");

        try {
            const options = {
                quality: 0.8,
                base64: true,
                skipProcessing: true,
            };
            await this.camera.takePictureAsync(options).then((data) => {
                uri = data.uri
                console.log(uri);
            });

            const visionResp = await RNTextDetector.detectFromUri(uri);
            console.log('visionResp', visionResp);
            let textDetectionarray = visionResp.map(d => d.text)
            detectedText = textDetectionarray.slice(-1)[0]
            if (detectedText.length === 6) {
                this.setState({
                    valueSet: detectedText
                })
            } else {
                this.setState({
                    valueSet: "Please capture again!"
                })
            }
            // console.log("Length: ", detectedText.length);
            console.log("Text: ", detectedText);

            this.setState({ isCameraVisible: false })

            if (this.state.valueSet === "Please capture again!") {
                Alert.alert(
                    'Error ',
                    this.state.valueSet,
                    [
                        {
                            text: 'Cancel',
                            onPress: () => console.log('Cancel Pressed'),
                            style: 'cancel',
                        },
                        { text: 'OK', onPress: () => this.detectValue() },
                    ],
                    { cancelable: false },
                );
            } else {
                Alert.alert(
                    'Is this a right code?',
                    this.state.valueSet,
                    [
                        {
                            text: 'No',
                            onPress: () => console.log('Cancel Pressed'),
                            style: 'cancel',
                        },
                        { text: 'Yes', onPress: () => {
                            AsyncStorage.setItem('traceCode', JSON.stringify(this.state.valueSet))
                            this.props.navigation.navigate('TraceDetails') }},
                    ],
                    { cancelable: false },
                );
            }

        } catch (e) {
            console.warn(e);
        }
    };

    detectValue = () => {
        this.detectText()
    }

    showCameraView = () => {
        this.setState({ isCameraVisible: true });
    }

    render() {
        return (

            <View style={{ flex: 1 }}>
                {!this.state.isCameraVisible &&

                    <View style={{ flex: 1 }}>
                        {/* <Image
                            style={{ width: 150, height: 150 }}
                            source={require('../assets/image/diamond.png')}
                        /> */}
                        <LinearGradient
                            style={{
                                flex: 1,
                                width: "100%",
                                paddingLeft: 15,
                                paddingRight: 15,
                                borderRadius: 5,
                            }}
                            useAngle={true}
                            angle={145}
                            angleCenter={{ x: 0.4, y: 0.5 }}
                            colors={['rgba(243,96,151,0)', '#rgba(63,86,226,0.7)']}
                            start={{ x: 1, y: 1 }}
                            end={{ x: 0, y: 0 }}
                        >
                            <View style={{ alignItems: 'center' }}>
                                <TouchableOpacity
                                    style={styles.button12}
                                    onPress={this.showCameraView}
                                >
                                    <Icon name="camera" size={45} color="#333" />
                                    <Text style={{ fontSize: 14, color: '#333',fontFamily: 'Poppins-Light', color:'#333', fontStyle:'italic'}}>Trace Now</Text>
                                </TouchableOpacity>
                                
                                <Text style={{ fontSize: 20, color: '#333', marginTop: 20, fontFamily: 'Poppins-Light' }}>OR</Text>
                            </View>
                            <TextInput
                                style={{ marginBottom: 20, height: 45, borderWidth: 1, borderRadius: 5, borderColor: '#333', width: '100%', marginTop: 20, borderStyle: 'dashed' }}
                                onChangeText={TextInputValue =>
                                    this.setState({ valueSet: TextInputValue })
                                }
                                placeholderTextColor="rgba(0,0,0,0.5)"
                                placeholder="Enter code here"
                                value={this.state.valueSet}
                                multiline={true}
                            />
                            <TouchableOpacity
                                style={{ paddingTop: 10, marginBottom: 15, alignItems: 'center' }}
                                onPress={this.onSubmitCode}
                            >
                                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#03125e', '#0566b0']} style={styles.linearGradient}>
                                    <Text style={{
                                        padding: 10, borderRadius: 5, textAlign: 'center', color: '#fff', fontSize: 16, fontFamily: "Poppins-Light",
                                    }}>
                                        Submit
                            </Text>
                                </LinearGradient>
                            </TouchableOpacity>

                        </LinearGradient>
                    </View>}

                {this.state.isCameraVisible &&
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#333' }}>
                        <View style={{ aspectRatio: 1 / 1, justifyContent: 'center', width: '90%' }}>
                            <RNCamera
                                ref={ref => {
                                    this.camera = ref;
                                }}
                                // autoFocusPointOfInterest={{ x: 0.5, y: 0.5 }}
                                ratio="1:1"
                                defaultTouchToFocus
                                focusDepth={1}
                                zoom={0.7}
                                mirrorImage={false}
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    aspectRatio: 1 / 1
                                }}
                            />
                        </View>
                        <View style={{ justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 20, marginTop: 30 }}>
                            <TouchableOpacity
                                onPress={this.detectText}
                                style={{ justifyContent: 'flex-end', alignItems: 'flex-end', backgroundColor: '#333', padding: 17, borderRadius: 50, borderColor: '#ff0000', borderWidth: 2 }}>
                                <Icon name="camera" size={40} color="#fff" />
                            </TouchableOpacity>
                        </View>

                    </View>}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        backgroundColor: '#57C4DD',
        padding: 10,
        width: '60%',
        borderRadius: 5
    },
    button12: {
        alignItems: 'center',
        borderColor: '#333',
        borderWidth: 2,
        borderStyle: 'dashed',
        padding: 10,
        width: '30%',
        borderRadius: 20,
        marginTop: 20
    },
    linearGradient: {
        borderRadius: 7,
        padding: 1,
        textAlign: 'center',
        fontFamily: 'Poppins-Light',
        color: '#fff',
        width: "100%",
        justifyContent: 'center', textAlign: 'center',
    }
});
