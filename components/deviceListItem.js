import React, {PropTypes} from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';

import chrome from '../img/chrome.png';
import apple from '../img/apple.png';
import android from '../img/android.png';

const icons = {
    chrome,
    apple,
    android
};

const DeviceListItem = (props) => {
    return (
        <View style={styles.deviceListItem}>
            <Image style={styles.deviceListItemImage} source={icons[props.device.name]}/>
            <Text style={styles.titleText}>{props.device.count}</Text>
        </View>
    );
};

DeviceListItem.propTypes = {
    device  : PropTypes.object.isRequired
};

export default DeviceListItem;

const styles = StyleSheet.create({
    titleText:{
        fontSize: 15
    },
    deviceListItem:{
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15
    },
    deviceListItemImage:{
        marginRight: 5
    }
});