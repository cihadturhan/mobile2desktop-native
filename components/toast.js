import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, Text} from 'react-native';

const Toast = (props) => {

    return (props.isVisible &&
        <View style={styles.container}>
            <View style={styles.wrapper}>
                <Text style={styles.content}>{props.content}</Text>
            </View>
        </View>);
};

Toast.propTypes = {
    content  : PropTypes.string.isRequired,
    isVisible : PropTypes.bool
};

export default Toast;

var styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 10,
        left: 0,
        right: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    wrapper:{
        backgroundColor: '#00C086',
        borderRadius: 4,
        padding:10,

    },
    content:{
        color: 'white',
        fontSize: 20,
    }
});