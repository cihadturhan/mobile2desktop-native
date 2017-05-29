import React, {Component} from 'react';

import icon from './pasync-icon.png';
import iconConnected from './pasync-connected.png';
import iconRegistered from './pasync-registered.png';
import iconError from './pasync-error.png';

import constants from 'paste-n-sync-constants';
const version = '1.0';

export default class Mobile2DesktopSocketHandler extends Component {
    version;
    io;

    constructor(props) {

        super(props);
        this.version = version;
        this.state = {
            connected: false,
            joined: false,
            registered: false,
            status: 'Disconnected',
            resource: icon,
            content: 'Type Your First Message',
            messages: [],
            devices: {},
        };
    }

    componentDidMount() {
        this.addEvents();
    }

    addEvents() {
        this.io.on('connect', () => {
            console.log('connected!');
            this.setState({
                connected: true,
                status: 'Connected',
                resource: iconConnected
            });

            if (this.state.sessionCredentials.UserToken) {
                this.join();
            } else {
                this.register();
            }
        }).on('connect_error', () => {
            console.log(arguments);
        });


        this.io.on('disconnect', () => {
            console.log('disconnected');
            this.setState({
                connected: false,
                registered: false,
                joined: false,
                status: 'Disconnected',
                resource: iconError
            });
        });

        this.io.on(constants.MESSAGE, (message)=> {
            console.log('message', message);
            this.state.messages.unshift(message);
            this.setState(this.state);
        });

        this.io.on(constants.LOGOUT, (msg)=> {
            console.log('message', msg);
            this.setState({
                joined: false,
                registered: false,
                status: 'Connected',
                resource: iconConnected
            });

            let UserToken = null;
            let sessionCredentials = Object.assign({}, this.state.sessionCredentials, {UserToken});
            this.setState({sessionCredentials});

            this.onLogout();
        });

        this.io.on(constants.MESSAGE_ERROR, (msg)=> {
            this.showError(msg);
        });

        this.io.on(constants.REGISTER_SUCCESS, (UserToken) => {
            console.log('register success');

            let userCredentials = Object.assign({}, this.state.sessionCredentials, {UserToken});

            this.setState({
                    registered: true,
                    status: 'Registered',
                    resource: iconRegistered,
                    userCredentials
                }, () => {
                    this.onRegister(UserToken);
                    this.join();
                });

        });

        this.io.on(constants.REGISTER_ERROR, (msg) => {
            this.showError(msg);
            this.setState({
                registered: false,
                resource: iconError
            });
        });


        this.io.on(constants.JOIN_SUCCESS, () => {
            console.log('join success');
            this.setState({
                joined: true,
                status: 'Alive',
                resource: icon
            });
            this.onJoin();
        });

        this.io.on(constants.JOIN_ERROR, (msg) => {
            this.showError(msg);
            this.setState({
                joined: false,
                resource: iconError
            });
        });

        this.io.on(constants.DEVICE_LIST, (devices) => {
            console.log('device list', devices);
            this.setState({
                devices: devices
            });
        });

        this.io.on(constants.MESSAGE_LIST, (messages) => {
            console.log('message list', messages);
            this.setState({
                messages
            });
        });
    }

    register() {
        if (this.state.userCredentials.UserId.trim() && this.state.userCredentials.password.trim()) {
            this.io.emit(constants.REGISTER, this.state.userCredentials);
            console.log('register!');
        } else {
            console.log('User credentails are missing!');
        }

    }

    onRegister(UserToken) {
        this.state.sessionCredentials.UserToken = UserToken;
        this.setState(this.state);
    }

    onJoin() {}

    showError(){}

    join() {
        if (this.state.sessionCredentials) {
            console.log('join!');
            this.io.emit(constants.JOIN, this.state.sessionCredentials);
        } else {
            console.error('Session credentials are missing');
        }
    }

    sendMessage() {
        if (this.state.joined) {
            console.log('message send');
            this.io.emit(constants.MESSAGE, {
                version: this.version,
                type: constants.TYPES.TEXT,
                content: this.state.content
            });
        } else {
            console.error('Not joined');
        }

    }

    logout() {
        //this.setState(this.state);
    }

    onLogout() {

    }

}