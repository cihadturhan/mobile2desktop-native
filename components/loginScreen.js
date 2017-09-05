import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, TextInput, Text, ScrollView} from 'react-native';
import CustomTextInput from './textInput';
import CustomButton from './button';
import {Button} from 'react-native-elements';
import styles from '../styles/global';
import colors from '../styles/colors';


const LoginScreen = (props) => {
    return (
        <View style={[styles.container, overrides.container]}>
            <View style={[styles.navigationBar, overrides.navigationBar]}>
                <View style={styles.title}>
                    <Text style={[styles.titleText, styles.textDefault, overrides.titleText]}>Register or Login</Text>
                </View>
            </View>

            <ScrollView
                style={overrides.scrollView}
                contentContainerStyle={overrides.scrollViewContent}
            >

                <View style={[styles.textInputContainer, overrides.textInputContainer]}>
                    <Text style={[styles.label]}>Email</Text>
                    <CustomTextInput
                        onChangeText={props.onUserIdChange}
                        value={props.userCredentials.UserId}
                        placeholder="name@mail.com"
                        keyboardType="email-address"
                    />

                    <Text style={[styles.label]}>Password</Text>
                    <CustomTextInput
                        onChangeText={props.onPasswordChange}
                        value={props.userCredentials.password}
                        secureTextEntry={true}
                        placeholder="*******"
                    />

                    <CustomButton
                        onPress={props.onRegister}
                        disabled={!props.userCredentials.fieldsValid}
                        hasArrow={false}
                        title='Register or Login'/>

                    <Text style={overrides.infoText}>Make sure you entered correct e-mail. We will send you an e-mail if you forget password.</Text>
                </View>
            </ScrollView>
        </View>);
};

export default LoginScreen;

LoginScreen.propTypes = {
    userCredentials: PropTypes.object.isRequired,
    onPasswordChange: PropTypes.func.isRequired,
    onUserIdChange: PropTypes.func.isRequired,
    onRegister: PropTypes.func.isRequired,
};

const overrides = StyleSheet.create({
    infoText:{
        fontSize: 12,
        textAlign: "center",
        color: colors.marineBlue,
    },
    scrollView:{
        flex: 1,
        flexDirection: 'column',
    },
    scrollViewContent:{
        flex: 1,
        padding: 10,
    },
    textInputContainer: {
        backgroundColor: 'transparent',
        borderRadius: 10,
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 24,
        paddingBottom: 32,

    },
    navigationBar: {
        justifyContent: 'center',
    },
    titleText: {
        fontSize: 18
    },
    buttonSend:{
      marginTop: 16,
    },
    container: {
        /*alignItems: 'center',*/
        justifyContent: 'center'
    }
});
