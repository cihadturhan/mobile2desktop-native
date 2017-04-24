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

import styles from './styles/global';

import LoginScreen from './components/loginScreen';
import MessageList from './components/messageList';
import DeviceList from './components/deviceList';
import Toast from './components/toast';
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
        this.state.sessionCredentials = {
            deviceUuid,
            deviceName,
            UserToken: UserInfo.get(UserInfo.USER_TOKEN) || '',
        };

        this.io = SocketIOClient(url, {jsonp: false});

        this.state.userCredentials = {
            UserId: UserInfo.get(UserInfo.USER_ID) || '',
            password: '',
            fieldsValid: false,
        };

        this.state.contentHeight = 0;
        this.state.isToastVisible = false;

        this._onPasswordChange = this._onPasswordChange.bind(this);
        this._onUserIdChange = this._onUserIdChange.bind(this);
        this._onContentSizeChange = this._onContentSizeChange.bind(this);
        this._getClipboardContent = this._getClipboardContent.bind(this);
        this._onCopy = this._onCopy.bind(this);
        this.checkFieldsValid = this.checkFieldsValid.bind(this);
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

    /* Login Screen Related */

    _onUserIdChange(UserId) {
        var userCredentials = Object.assign({}, this.state.userCredentials, {UserId});
        this.setState({userCredentials}, this.checkFieldsValid);
        UserInfo.save(UserInfo.USER_ID, UserId)
    }

    _onPasswordChange(password) {
        var userCredentials = Object.assign({}, this.state.userCredentials, {password});
        this.setState({userCredentials}, this.checkFieldsValid);
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
    }

    _onContentSizeChange(event) {
        this.setState({contentHeight: event.nativeEvent.contentSize.height + 29});
    }

    _onCopy() {
        this.setState({
            isToastVisible: true
        });

        setTimeout(()=> {
            this.setState({
                isToastVisible: false
            });
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
                    onRegister={this.onRegister}
                />}
                {console.log(this.state.userCredentials)}

                {this.state.joined && (<View style={styles.container}>

                    <View style={styles.navigationBar}>
                        <View><Image source={this.state.resource}/></View>
                        <View style={styles.title}><Text
                            style={[styles.titleText, styles.textDefault]}>{this.state.status}</Text></View>
                        <DeviceList devices={this.state.devices}/>
                    </View>

                    <Text style={styles.smallHeader}>Copied Text</Text>
                    <View style={styles.textInputContainer}>
                        <TextInput
                            style={[styles.textInput, {height: Math.max(35, this.state.contentHeight)}]}
                            onChangeText={(content) => this.setState({content})}
                            value={this.state.content}
                            multiline={true}
                            numberOfLines={14}
                            onContentSizeChange={this._onContentSizeChange}
                            placeholder="Paste your awesome text"
                            returnKeyType="done"
                        /></View>

                    <View style={styles.sendContainer}>
                        {false && <Button
                            onPress={this._getClipboardContent}
                            icon={{name: 'content-paste'}}
                            disabled={!this.state.joined}
                            title='Paste'
                            buttonStyle={styles.buttonPaste}/>}

                        <Button
                            onPress={this._sendMessage.bind(this)}
                            icon={{name: 'send'}}
                            disabled={!this.state.joined}
                            title='Send Message'
                            buttonStyle={styles.buttonSend}/>
                    </View>

                    <Text style={styles.smallHeader}>Your History</Text>

                    <ScrollView style={styles.scrollView} contentContainerStyle={{flex: 0}}>
                        <MessageList onCopy={this._onCopy} messages={this.state.messages}/>
                    </ScrollView>

                    <Toast isVisible={this.state.isToastVisible} onTimeout={this.hideToast} content="Copied!"/>

                </View>)}
            </DismissKeyboardView>
        );
    }
}

AppRegistry.registerComponent('mobile2desktop', () => mobile2desktop);
