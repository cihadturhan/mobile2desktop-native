import React, {PropTypes} from 'react';
import {StyleSheet, View, TextInput, Text, ScrollView} from 'react-native';
import {Button} from 'react-native-elements';
import styles from '../styles/global';


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
                    <TextInput
                        autoCapitalize="none"
                        autoCorrect={false}
                        style={[styles.textInput, overrides.textInput]}
                        onChangeText={props.onUserIdChange}
                        value={props.userCredentials.UserId}
                        placeholder="Email address"
                        keyboardType="email-address"
                        returnKeyType="next"
                    />

                    <TextInput
                        style={[styles.textInput, overrides.textInput]}
                        onChangeText={props.onPasswordChange}
                        value={props.userCredentials.password}
                        secureTextEntry={true}
                        placeholder="Password"
                        returnKeyType="done"
                    />

                    <Button
                        onPress={props.onRegister}
                        icon={{name: 'check'}}
                        disabled={!props.userCredentials.fieldsValid}
                        title='Register or Login'
                        buttonStyle={[styles.buttonSend, overrides.buttonSend]}/>
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
    textInput: {
        padding: 10,
        fontSize: 20,
        backgroundColor: 'hsla(0, 0%, 100%, 0.8)',
        marginBottom: 10,
        borderRadius: 5,
        lineHeight: 20*1.6,
        minHeight: 50
    },
    scrollView:{
        flex: 1,
        flexDirection: 'column',
    },
    scrollViewContent:{
        alignItems: 'stretch',
        justifyContent: 'center',
        flex: 1,
        padding: 10,

    },
    textInputContainer: {
        backgroundColor: 'transparent',
        borderRadius: 10,
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 32,
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
