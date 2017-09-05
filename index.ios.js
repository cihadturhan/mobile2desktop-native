import React, {Component} from 'react';
import {
    AppRegistry,
    Text,
    View,
    ScrollView,
    Clipboard,
    Image,
    TextInput
} from 'react-native';

import * as UserInfo from './models/userInfo';

import Mobile2DesktopSocketHandler from './Mobile2DesktopSocketHandler';

import {Button} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';

import styles from './styles/global';
import colors from './styles/colors';

import LoginScreen from './components/loginScreen';
import MessageList from './components/messageList';
import Footer from './components/footer';
import Toast from './components/toast';
import CustomTextArea from './components/textArea';
import CustomButton from './components/button';
import SmallHeader from './components/smallHeader';
import DismissableView from './components/dismissableView';

const DismissKeyboardView = DismissableView(View);

import './userAgent';
import SocketIOClient from 'socket.io-client';
import DeviceInfo from 'react-native-device-info';
const deviceUuid = DeviceInfo.getUniqueID();
const deviceName = DeviceInfo.getBrand() + '/' + DeviceInfo.getDeviceId() + '/' + DeviceInfo.getSystemName();

const url = 'mobile2desktop.herokuapp.com';
//const url = 'localhost:3000';

export default class mobile2desktop extends Mobile2DesktopSocketHandler {

    constructor(props) {
        super(props);
        /*UserInfo.remove(UserInfo.USER_TOKEN);
        UserInfo.remove(UserInfo.USER_ID);*/

        this.state.sessionCredentials = {
            deviceUuid,
            deviceName,
            UserToken: UserInfo.get(UserInfo.USER_TOKEN) || ''
        };

        this.io = SocketIOClient(url, {jsonp: false});

        this.state.userCredentials = {
            UserId: UserInfo.get(UserInfo.USER_ID) || '',
            password: '',
            fieldsValid: false
        };

        this.state.contentHeight = 0;
        this.state.isToastVisible = false;
        this.state.error = {};

        this._onPasswordChange = this
            ._onPasswordChange
            .bind(this);
        this._onUserIdChange = this
            ._onUserIdChange
            .bind(this);
        this._getClipboardContent = this
            ._getClipboardContent
            .bind(this);
        this._onCopy = this
            ._onCopy
            .bind(this);
        this.checkFieldsValid = this
            .checkFieldsValid
            .bind(this);
        this.register = this
            .register
            .bind(this);
        this._sendMessage = this
            ._sendMessage
            .bind(this);
    }

    componentDidMount = () => {
        super.componentDidMount();
        this._getClipboardContent();
    }
    

    /* Overrides */

    onRegister(UserToken) {
        console.log(UserToken);
        super.onRegister(UserToken);
        UserInfo.save(UserInfo.USER_TOKEN, UserToken);
    }

    logout() {
        super.logout();
        UserInfo.remove(UserInfo.USER_TOKEN);
    }

    showError(errorMessage) {
        let error = {
            enabled: true,
            message: errorMessage
        };

        this.setState({error});

        setTimeout(() => {
            this.setState({error: {}})
        }, 3000)
    }

    /* Login Screen Related */

    _onUserIdChange(UserId) {
        var userCredentials = Object.assign({}, this.state.userCredentials, {UserId});
        this.setState({
            userCredentials
        }, this.checkFieldsValid);
        UserInfo.save(UserInfo.USER_ID, UserId)
    }

    _onPasswordChange(password) {
        var userCredentials = Object.assign({}, this.state.userCredentials, {password});
        this.setState({
            userCredentials
        }, this.checkFieldsValid);
    }

    checkFieldsValid() {
        let uc = this.state.userCredentials;
        let mailRegex = /^[a-z][+a-zA-Z0-9_.]*(\.[a-zA-Z][a-zA-Z0-9_.]*)?@[a-z][a-zA-Z-0-9]*\.[a-z]+(\.[a-z]+)?$/;
        let fieldsValid = mailRegex.test(uc.UserId) && uc.password.length > 6;
        let userCredentials = Object.assign({}, uc, {fieldsValid});
        this.setState({userCredentials});
    }

    /* Main Screen Related */

    _sendMessage() {
        super.sendMessage();
        this.setState({content: ''});
    }

    _onCopy() {
        this.setState({isToastVisible: true});

        setTimeout(() => {
            this.setState({isToastVisible: false});
        }, 1000)
    }

    _getClipboardContent = async() => {
        try {
            var content = await Clipboard.getString();
            this.setState({content});
        } catch (e) {
            this.setState({content: e.message});
        }
    };

    render() {
        return (

            <DismissKeyboardView>

                {!this.state.joined && <LoginScreen
                    userCredentials={this.state.userCredentials}
                    onPasswordChange={this._onPasswordChange}
                    onUserIdChange={this._onUserIdChange}
                    onRegister={this.register}/>}

                {this.state.joined && (
                    <View style={styles.container}>

                        <LinearGradient style={styles.textInputContainer} 
                        colors={[colors.ceruleanBlue, colors.dodgerBlue]}>

                            {true
                                ? <CustomTextArea
                                        value={this.state.content}
                                        placeholder="Paste your awesome text"
                                        onChangeText={(content) => this.setState({content})}/>
                                : <View>
                                    <View><Image source={this.state.resource}/></View>
                                    <View style={styles.title}>
                                        <Text style={[styles.titleText, styles.textDefault]}>{this.state.status}</Text>
                                    </View>
                                </View>}

                        </LinearGradient>

                        <View style={styles.sendContainer}>
                            {false && <Button
                                onPress={this._getClipboardContent}
                                icon={{
                                name: 'content-paste'
                            }}
                                disabled={!this.state.joined}
                                title='Paste'
                                buttonStyle={styles.buttonPaste}/>}

                            <CustomButton
                                onPress={this._sendMessage}
                                disabled={!this.state.joined}
                                hasArrow={true}
                                title='Send to Devices'/>

                                <SmallHeader/>
                        </View>                       

                        <ScrollView
                            style={styles.scrollView}
                            contentContainerStyle={{
                                flexGrow: 1
                        }}>
                            <MessageList onCopy={this._onCopy} messages={this.state.messages}/>
                        </ScrollView>

                        <Footer devices={this.state.devices}/>

                        <Toast
                            isVisible={this.state.isToastVisible}
                            onTimeout={this.hideToast}
                            content="Copied!"/>

                    </View>
                )}

                {this.state.error.enabled && <View style={styles.errorView}>
                    <Text style={styles.errorViewText}>{this.state.error.message}</Text>
                </View>}
            </DismissKeyboardView>
        );
    }
}

AppRegistry.registerComponent('mobile2desktop', () => mobile2desktop);
