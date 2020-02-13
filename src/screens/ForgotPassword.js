import React, { Component } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, TouchableOpacity, TextInput, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import { API_URL } from "../utils/config";
import { showMessage } from "react-native-flash-message";

var passwordData;

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
    }

    Login = async () => {

        if (this.state.emailValue === 1) {
            emailData = 1
            this.setState({ nameError: "Please enter valid Email ID" })
        } else {
            emailData = null
            this.setState({ nameError: null })
        }

        if (this.state.email.trim() === "") {
            emailData = 1
            this.setState({ nameError: "Please enter Email ID" })
        } else {
            emailData = null
            this.setState({ nameError: null })
        }

        if (this.state.password.trim() === "") {
            passwordData = 1;
            this.setState({ passwordError: "Please enter Password" });
        } else {
            passwordData = null;
            this.setState({ passwordError: null });
        }
        // this.loginFetch();
    }

    forgotpasswordlink = async () => {
        await fetch(API_URL.FORGOT, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "emailId": this.state.email
            })
        })
            .then(response => response.json())
            .then(res => {
                console.log("Forgot response =======", JSON.stringify(res))
                if (res.statusCode === 400) {
                    showMessage({
                        message: "Error",
                        description: "EmailID does not exists!",
                        type: "danger",
                        backgroundColor: "#cc0000", // background color
                        color: "#ffffff", // text color
                        icon: 'danger',
                        textStyle: {
                            fontSize: 14,
                            fontWeight: '100',
                            fontFamily: 'SegoePro-SemiLight'
                        },
                        titleStyle: {
                            fontSize: 18,
                            fontWeight: '100',
                            fontFamily: 'SegoePro-Bold'
                        }
                    });
                } else if(res.statusCode === 200) {
                    showMessage({
                        message: "Welcome",
                        description: "Successfully sent the mail to your specified email address!",
                        type: "success",
                        icon: 'success',
                        textStyle: {
                            fontSize: 14,
                            fontWeight: '100',
                            fontFamily: 'SegoePro-SemiLight'
                        },
                        titleStyle: {
                            fontSize: 18,
                            fontWeight: '100',
                            fontFamily: 'SegoePro-Bold'
                        }
                    });
                    this.props.navigation.navigate('SignIn')
                }

            })
            .catch(error => {
                this.setState({
                    pressed: false,
                    textValue: 'SIGN IN'
                })
                showMessage({
                    message: "Error",
                    description: "Please enter valid email or password!",
                    type: "danger",
                    backgroundColor: "#cc0000", // background color
                    color: "#ffffff", // text color
                    icon: 'danger',
                    textStyle: {
                        fontSize: 14,
                        fontWeight: '100',
                        fontFamily: 'SegoePro-SemiLight'
                    },
                    titleStyle: {
                        fontSize: 18,
                        fontWeight: '100',
                        fontFamily: 'SegoePro-Bold'
                    }
                });
            });
    }
    validate = (text) => {
        console.log(text);
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(text) === false) {
            console.log("Email is Not Correct");
            this.setState({
                email: text,
                emailValue: 1
            })
            return false;
        }
        else {
            this.setState({
                email: text,
                emailValue: null
            })
            console.log("Email is Correct");
        }
    }

    render() {
        return (
            <LinearGradient
                style={{
                    width: "100%",
                    paddingLeft: 15,
                    paddingRight: 15,
                    borderRadius: 5
                }}
                useAngle={true}
                angle={145}
                angleCenter={{ x: 0.4, y: 0.5 }}
                colors={['#E46F9B', '#3F56E2']}
                start={{ x: 1, y: 1 }}
                end={{ x: 0, y: 0 }}
            >
                <ScrollView style={{ width: '100%', height: '100%' }}>
                    {/* <ImageBackground
                    source={require('../assets/image/scanImage.jpg')}
                    style={styles.backgroundImage}>
                </ImageBackground > */}
                    <View style={{ marginLeft: 15, marginRight: 15, marginTop: 20, paddingTop: '50%' }}>
                        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                        <Image
                            style={{ width: 100, height: 100 , marginBottom:40}}
                            source={require('../assets/image/forgotPassword.png')}
                        />
                        </View>
                        {/* <Text style={{ textAlign: 'center', fontSize: 22, color: '#fff', fontWeight: '100', fontFamily: 'SegoePro-Bold' }}>SIGN IN </Text> */}
                        <TextInput
                            style={styles.TextInputStyleClass2}
                            placeholder=" Email ID"
                            keyboardType="email-address"
                            placeholderTextColor='#fff'
                            value={this.state.email}
                            onChangeText={TextInputValue =>
                                this.setState({ email: TextInputValue }, function () { this.validate(TextInputValue) })
                            }
                        />
                        {!!this.state.nameError && (
                            <Text style={{ color: "red", marginTop: -20, fontSize: 12, marginBottom: 10 }}>{this.state.nameError}</Text>
                        )}
                       

                        <TouchableOpacity style={{ paddingTop: 20, marginBottom: 15, alignItems: 'center' }}
                            onPress={this.forgotpasswordlink.bind(this)}>
                            
                            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#f7e6c5', '#f9c04c']} style={styles.linearGradient}>
                                <Text style={{
                                    padding: 12, borderRadius: 5, textAlign: 'center', color: '#4A3100', fontSize: 16, fontFamily: "Poppins-Light",
                                }}>
                                    Submit
                            </Text>
                            </LinearGradient>
                        </TouchableOpacity>
                        <View style={{ alignItems: 'center', justifyContent: 'flex-end', alignContent: 'flex-end' }}>

                            <TouchableOpacity
                                onPress={() => {
                                    this.props.navigation.navigate('SignIn');
                                }}>
                                <Text
                                    style={{
                                        fontSize: 13,
                                        fontWeight: '100',
                                        fontFamily: 'SegoePro-SemiLight'
                                    }}>
                                    {' '}
                                    <Text style={{ color: '#fff', fontFamily: 'SegoePro-Ligight' }}>Go back to </Text>
                                    <Text style={{ color: '#ca915a', fontWeight: 'bold' }}>SIGN IN</Text>
                                </Text>

                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </LinearGradient>
        );
    }
}

export default SignIn;

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
    TextInputStyleClass2: {
        paddingLeft: 10,
        fontSize: 14,
        height: 48,
        color: '#fff',
        borderRadius: 3,
        marginTop: 20,
        backgroundColor: 'rgba(0,109,205,0.03)',
        borderWidth: 1,
        borderColor: '#fff',
        fontFamily: 'SegoePro-SemiLight'
    },
    linearGradient: {
        flex: 1,
        borderRadius: 7,
        padding: 1.5,
        textAlign: 'center',
        fontFamily: 'Poppins-Light',
        color: '#fff',
        width: "100%",
        justifyContent: 'center', textAlign: 'center',
    }
});