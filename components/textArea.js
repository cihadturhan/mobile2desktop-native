import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Text, View, TextInput, StyleSheet} from 'react-native'

import colors from '../styles/colors';

export class CustomTextArea extends Component {

    constructor(props){
        super(props);

        this._onContentSizeChange = this._onContentSizeChange.bind(this);

        this.state = {
            contentHeight: 0,
        };
    }


    _onContentSizeChange(event) {
        this.setState({
            contentHeight: event.nativeEvent.contentSize.height + 29
        });
    }

    render() {
        let override = {
                    height: Math.max(35, 0 /*this.state.contentHeight*/)
                };
        return (<TextInput
            value={this.props.value}
            style={[
            styles.textInput
            ]}
            onChangeText={this.props.onChangeText}
            multiline={true}
            placeholder={this.props.placeholder}
            returnKeyType="done"
            onContentSizeChange={this._onContentSizeChange}/>)
    }
}

CustomTextArea.propTypes = {
    placeholder: PropTypes.string,
    value: PropTypes.string,
    onChangeText: PropTypes.func.isRequired,
}

export default CustomTextArea;

const styles = StyleSheet.create({
    textInput: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        color: colors.whiteTwo,
        height: 160,
        padding: 0,
        fontFamily: "TitilliumWeb-SemiBold",
        fontSize: 36,
        lineHeight: 42.0,
        textAlign: "center",
        textShadowColor: colors.darkGreyBlue40,
        textShadowOffset: {
            width: 0,
            height: 1
        },
        textShadowRadius: 2,
        margin: 10,
        marginTop: 20,
    },
    textInputFocused: {
        borderColor: colors.deepSkyBlue,
    },
});