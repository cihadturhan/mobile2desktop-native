import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { TextInput, StyleSheet } from 'react-native';


import colors from '../styles/colors';

class CustomTextInput extends TextInput{

    constructor(props){
        super(props);
        this.onBlur = this.onBlur.bind(this);
        this.onFocus = this.onFocus.bind(this);
    }

    onFocus() {
        this.setState({
            focused: true
        });
    }

    getInitialState(){
        return {
            focused: false,
        };
    }

    onBlur() {
        this.setState({
            focused: false
        });
    }

    render(){
        let props = this.props;
        return <TextInput
        onChangeText={props.onChangeText}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        value={props.value}
        placeholder={props.placeholder}
        keyboardType={props.keyboardType}
        style={[styles.textInput, this.state.focused ? styles.textInputFocused: {}]}
        autoCapitalize="none"
        returnKeyType="next"
        autoCorrect={false}
        secureTextEntry={props.secureTextEntry || false}
    />
    }
}

export default CustomTextInput;

CustomTextInput.propTypes = {
    onChangeText: PropTypes.func.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    placeholder: PropTypes.string,
    keyboardType: PropTypes.string,
    secureTextEntry: PropTypes.bool,
}

const styles = StyleSheet.create({
    textInput: {
        borderRadius: 8,
        backgroundColor: colors.duckEggBlue,
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: colors.lightBlueGreyThree,
        padding: 16,
        fontFamily: "TitilliumWeb-Regular",
        fontSize: 14,
        color: colors.marineBlue,
        marginBottom: 20,
    },
    textInputFocused: {
        borderColor: colors.deepSkyBlue,
    },
});