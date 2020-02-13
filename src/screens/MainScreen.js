import React, { Component } from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';

class MainScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
    }

    goToNewScreen = () => {
        this.props.navigation.navigate('TextDetection');
    }

    render() {
        return (
            <ScrollView style={{ flex: 1 }}>
                <ImageBackground
                    source={require('../assets/image/scanImage.jpg')}
                    style={styles.backgroundImage}>
                </ImageBackground >
                <View style={{ marginLeft: 15, marginRight: 15, paddingTop: 100 }}>
                    <Text style={{ textAlign: 'center', fontSize: 14, color: '#555', fontFamily: 'SegoePro-Light' }}>The only QR scanner you need </Text>
                    <Text style={{ textAlign: 'center', fontSize: 28, color: '#555', fontFamily:'SegoePro-Bold'}}>Traceability</Text>

                    {/* <View style={{ justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 20, marginTop: 30 }}> */}

                    <TouchableOpacity style={{ paddingTop: 60, marginBottom: 15, alignItems: 'center' }}
                        onPress={() => {
                            this.props.navigation.navigate('SignIn');
                        }}>
                        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#0566b0', '#03125e']} style={styles.linearGradient}>
                            <Text style={{
                                padding: 15, borderRadius: 5, textAlign: 'center', color: '#fff', fontSize: 16, fontFamily: "Poppins-Light",
                            }}>
                                Trace Your Diamond
                            </Text>
                        </LinearGradient>
                    </TouchableOpacity>
                    {/* </View> */}
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: "50%" }}>

                        <Text
                            style={{
                                fontSize: 13,
                                fontWeight: '100',
                                fontFamily: 'SegoePro-SemiLight'
                            }}>
                            {' '}
                            <Text style={{ color: '#aaa', fontWeight: '100',fontFamily: 'SegoePro-SemiLight' }}>Understand and agree Terms and Conditions</Text>
                        </Text>
                    </View>
                </View>
            </ScrollView>
        );
    }
}

export default MainScreen;

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        flexDirection: 'column',
        resizeMode: 'cover',
        paddingHorizontal: 16,
        height: 280
    },
    button: {
        alignItems: 'center',
        backgroundColor: 'rgba(243,112,6,0.8)',
        padding: 10,
        width: '100%',
        borderRadius: 5
    },
    linearGradient: {
        flex: 1,
        borderRadius: 7,
        padding: 1.5,
        textAlign: 'center',
        fontFamily: 'Poppins-Light',
        color: '#fff',
        width: "70%",
        justifyContent: 'center', textAlign: 'center',
    }
});