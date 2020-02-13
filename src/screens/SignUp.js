import React, { Component } from 'react';
import { Picker, View, Text, ImageBackground, StyleSheet, TouchableOpacity, TextInput, Image,ActivityIndicator } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import { country } from './country';
import { showMessage} from "react-native-flash-message";
import {API_URL} from "../utils/config"; 

var passwordData;
var passwordValidate;

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            emailId: '',
            password: '',
            userName: '',
            country: ''
        };
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

    validateNew = (text) => {
        console.log(text);
        // let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
        let reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-6])(?=.*[!@#\$%\^&_\*])(?=.{8,})/;
        if (reg.test(text) === false) {
            console.log("Password is Not Correct");
            this.setState({
                password: text,
                newValue: 1
            })
            return false;
        }
        else {
            this.setState({
                password: text,
                newValue: null
            })
            console.log("Password is Correct");
        }
    }


    Register = async () => {
        if (this.state.emailValue === 1) {
            emailData = 1;
            this.setState({ emailError: "Please enter valid Email ID" })
        } else {
            emailData = null;
            this.setState({ emailError: null })
        }
        if (this.state.emailId.trim() === "") {
            emailData = 1;
            this.setState({ emailError: "Please enter Email ID" })
        } else {
            emailData = null;
            this.setState({ emailError: null })
        }

        if (this.state.password.trim() === "") {
            passwordData = 1;
            this.setState({ nameError: "Please enter Password" })
        } else {
            passwordData = null;
            if (passwordValidate === 1) {
                this.setState({ nameError: "The password must have a minimum of 6 characters, 1 number, 1 upper case,1 lower case and a special character." })
            } else if (passwordValidate === 0) {
                this.setState({ nameError: "" })
            }
        }
        if(this.state.password.trim() === ""){
            passwordData =1;
            this.setState({nameError: "Please enter Password" })
          } else {
            passwordData = null;
            if (passwordValidate === 1) {
            this.setState({nameError: "The password must have a minimum of 6 characters, 1 number, 1 upper case,1 lower case and a special character." })
            } else if(passwordValidate === 0){
              this.setState({nameError : ""})
            }
          }

        if (this.state.userName.trim() === "") {
            this.setState({ fNameError: "Please enter First Name" })
        } else {
            this.setState({ fNameError: null })
        }

        if (this.state.country === "Select Country") {
            countryData = 1;
            this.setState({ countryError: "Please select country" })
        } else {
            countryData = null;
            this.setState({ countryError: null })
        }

        if (emailData === null && passwordData === null && countryData === null) {
            this.setState({
                pressed: true,
                textValue: 'Processing...'
            })
            fetch(API_URL.REGISTER, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "emailId": this.state.emailId,
                    "password": this.state.password,
                    "country": this.state.country,
                    "userName": this.state.userName,
                    })
            })
                .then(response => response.json())
                .then(responseJson => {
                    console.log("registration responseJson..>", responseJson);
                    if (responseJson.Status === "EmailID already exists") {
                        showMessage({
                            message: "Oops!",
                            description: "User Already exists",
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
                        this.setState({
                            pressed: false,
                            textValue: 'SIGN UP'
                        })
                    } else {
                        activekeyData = responseJson.activekey
                        this.setState({
                            activekey: responseJson.activekey,
                            pressed: false,
                            textValue: 'SIGN UP'
                        })
                        this.props.navigation.navigate("SignIn");
                    }
                })
                .catch(error => {
                    this.setState({
                        pressed: false,
                        textValue: 'SIGN UP'
                    })
                    console.error(error);
                });
        } else {
            this.setState({
                pressed: false,
                textValue: 'SIGN UP'
            })
            showMessage({
                message: "Error",
                description: "Please enter details!",
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
                <ScrollView style={{ width: '100%', height: '100%', }}>
                    {/* <ImageBackground
                    source={require('../assets/image/scanImage.jpg')}
                    style={styles.backgroundImage}>
                </ImageBackground > */}
                    <View style={{ marginLeft: 15, marginRight: 15, marginTop: 20, paddingTop: '40%' }}>
                        {/* <Text style={{ 
                            textAlign: 'center', 
                            fontSize: 22, 
                            color: '#fff', 
                            fontWeight: '100', 
                            fontFamily: 'SegoePro-Bold',
                            marginBottom:20}}>SIGN UP </Text> */}
                             <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                        <Image
                            style={{ width: 100, height: 100 , marginBottom:40}}
                            source={require('../assets/image/login.png')}
                        />
                        </View>
                        <TextInput
                            style={styles.TextInputStyleClass2}
                            placeholder=" Username"
                            keyboardType="email-address"
                            placeholderTextColor="#fff"
                            value={this.state.userName}
                            onChangeText={TextInputValue =>
                                this.setState({ userName: TextInputValue }, function () { this.validate(TextInputValue) })
                            }
                        />
                        {!!this.state.fNameError && (
                            <Text style={{ color: "red", marginTop: -20, fontSize: 12, marginBottom: 10 }}>{this.state.fNameError}</Text>
                        )}

                        <TextInput
                            style={styles.TextInputStyleClass2}
                            placeholder=" Email ID"
                            keyboardType="email-address"
                            placeholderTextColor="#fff"
                            value={this.state.emailId}
                            onChangeText={TextInputValue =>
                                this.setState({ emailId: TextInputValue }, function () { this.validate(TextInputValue) })
                            }
                        />
                        {!!this.state.emailError && (
                            <Text style={{ color: "red", marginTop: -20, fontSize: 12, marginBottom: 10 }}>{this.state.emailError}</Text>
                        )}

                        <TextInput
                            style={styles.TextInputStyleClass3}
                            placeholder=" Password"
                            secureTextEntry={true}
                            placeholderTextColor="#fff"
                            keyboardType="email-address"
                            value={this.state.password}
                            onChangeText={TextInputValue =>
                                this.setState({ email: TextInputValue }, function () { this.validateNew(TextInputValue) })
                            }
                        />
                        {!!this.state.nameError && (
                            <Text style={{ color: "red", marginTop: -20, fontSize: 12, marginBottom: 10 }}>{this.state.nameError}</Text>
                        )}

                        <View style={{
                            paddingLeft: 10,
                            height: 48,
                            marginBottom: 20,
                            borderRadius: 3,
                            backgroundColor: 'rgba(0,109,205,0.03)',
                            borderWidth: 1,
                            color: '#fff',
                            borderColor: '#fff',
                            fontFamily: 'SegoePro-SemiLight'
                        }}>
                            <Picker
                                style={styles.pickerStyle}
                                placeholder="Select Country"
                                textStyle={{ fontSize: 4 }}
                                selectedValue={this.state.country}
                                onValueChange={(itemValue, itemIndex) =>
                                    this.setState({ country: itemValue }, function () {
                                        console.log("Item:::::", this.state.country);
                                    })
                                }>
                                <Picker.Item value='' label='Select Country' color="#fff" />
                                {
                                    country.map((d) => (
                                        <Picker.Item label={d.value} value={d.value} />
                                    ))
                                }
                            </Picker>
                        </View>
                        {!!this.state.countryError && (
                            <Text style={{ color: "red", marginTop: -20, fontSize: 12, marginBottom: 10 }}>{this.state.catError}</Text>
                        )}

                        <TouchableOpacity style={{ paddingTop: 20, marginBottom: 15, alignItems: 'center' }}
                            onPress={this.Register.bind(this)}>
                            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#f7e6c5', '#f9c04c']} style={styles.linearGradient}>
                                <Text style={{
                                    padding: 10, borderRadius: 5, textAlign: 'center', color: '#4A3100', fontSize: 16, fontFamily: "Poppins-Light",
                                }}>
                                    Register
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
        marginBottom: 20,
        height: 48,
        color: '#fff',
        borderRadius: 3,
        // marginTop: 20,
        backgroundColor: 'rgba(0,109,205,0.03)',
        borderWidth: 1,
        borderColor: '#fff',
        fontFamily: 'SegoePro-SemiLight'
    },
    TextInputStyleClass3: {
        paddingLeft: 10,
        fontSize: 14,
        height: 48,
        marginBottom: 20,
        color: '#fff',
        borderRadius: 3,
        // marginTop: 20,
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
        // color: '#fff',
        width: "100%",
        justifyContent: 'center', textAlign: 'center',
    },
    pickerStyle: {
        transform: [
            { scaleX: 0.87 },
            { scaleY: 0.9 },
        ],
        marginLeft: -36,
        marginRight: -28,
        fontFamily: 'SegoePro-SemiLight',
        marginTop: -3,
        borderColor: '#fff',
        borderRadius: 3
    }
});