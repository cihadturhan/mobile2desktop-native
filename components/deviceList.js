import React from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet} from 'react-native';
import DeviceListItem from './deviceListItem';


const DeviceList = (props) => {

    let deviceKeywords = [
        'apple',
        'android',
        'chrome',
    ];


    let deviceArr = deviceKeywords.map(name => {
        let count = 0;
        Object.keys(props.devices).forEach(key =>{
            let deviceLongName = props.devices[key].toLowerCase();
            if(deviceLongName.indexOf(name) > -1){
                count++;
            }
        });

       return {
           name,
           count
       }
    }).filter(d => d.count);

    return (
        <View style={styles.deviceList}>{
            deviceArr.map( (device, i) =>
                <DeviceListItem device={device} key={i}/>
            )
        }</View>
    );
};

DeviceList.propTypes = {
    devices  : PropTypes.object.isRequired
};

export default DeviceList;


const styles = StyleSheet.create({
    deviceList: {
        flex:1,
        flexDirection: 'row',
        justifyContent: 'center'
    }
});