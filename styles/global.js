import React from 'react';
import {StyleSheet} from 'react-native';
import colors from './colors';

export default styles = StyleSheet.create({
    title: {
        marginLeft: 10
    },
    titleText: {
        fontSize: 15,
    },
    scrollView: {
    },
    container: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        height: '100%'
    },
    textInputContainer: {
        height: 230
    },
    sendContainer: {
        flexDirection: 'column',
        alignItems: 'stretch'
    },
    errorView:{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        paddingTop: 30,
        paddingBottom: 15,
        paddingRight: 15,
        paddingLeft: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'tomato',
        zIndex: 3,
    },
    errorViewText: {
        color: 'white',
        fontSize: 15,
        textAlign: 'center',
        lineHeight: 1.4 * 15
    },
    navigationBar: {
        backgroundColor: '#F2F8FC',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        height: 80,
        paddingTop: 20,
        paddingLeft: 10,
        borderColor: '#DAE7F2',
        borderBottomWidth: 1,        
    },
    label:{
        fontSize: 14,
        lineHeight: 21,
        color: colors.marineBlue,
        fontFamily: "TitilliumWeb-Regular",
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