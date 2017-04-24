import React from 'react';
import {StyleSheet} from 'react-native';

export default styles = StyleSheet.create({
    title: {
        marginLeft: 10
    },
    titleText: {
        fontSize: 15,
    },
    scrollView: {},
    container: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        height: '100%'
    },
    textInputContainer: {
        minHeight: 20,
    },
    textInput: {
        fontSize: 24,
        padding: 10,
        color: 'rgb(0,53,102)',
        backgroundColor: 'white',
        minHeight: 40
    },

    sendContainer: {
        flexDirection: 'column',
        alignItems: 'stretch'
    },
    buttonSend: {
        backgroundColor: 'rgb(36,121,227)',
        marginLeft: 0,
        marginRight: 0,
        height: 53
    },
    smallHeader: {
        lineHeight: 30,
        marginBottom: 0,
        fontSize: 14,
        textAlign: 'center',

    },
    navigationBar: {
        backgroundColor: 'rgb(244,244,244)',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        height: 65,
        paddingTop: 20,
        paddingLeft: 10
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5
    },
    textDefault: {
        color: 'rgb(0,53,102)',
        fontSize: 15
    },

});