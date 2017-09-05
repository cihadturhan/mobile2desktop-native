import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {View, StyleSheet} from 'react-native';
import DeviceList from './deviceList';

export default class Footer extends Component {
    render() {
        return <View style={[styles.container]} >
            <DeviceList devices={this.props.devices}/>
        </View>
    }
}

Footer.propTypes = {
    devices: PropTypes.object.isRequired,
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 36,
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
});