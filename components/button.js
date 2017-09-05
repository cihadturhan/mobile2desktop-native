import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Text, View, Image, StyleSheet } from 'react-native'
import {Button} from 'react-native-elements';

import colors from '../styles/colors';
import triangleUp from '../img/triangle_up.png';

export class CustomButton extends Component {
  render() {
    return (
        <View style={[styles.buttonContainer, this.props.hasArrow ? styles.buttonContainerOverride : {}]}>
            {this.props.hasArrow && <Image style={styles.arrowUp} source={triangleUp}></Image>}
            
        <Button
            onPress={this.props.onPress}
            disabled={this.props.disabled}
            title={this.props.title}
            buttonStyle={styles.buttonPrimary}
            containerViewStyle={styles.shadowContainer}
            textStyle={styles.textStyle}
            />
        </View>
    )
  }
}

export default CustomButton;

CustomButton.propTypes = {
    onPress: PropTypes.func,
    title: PropTypes.string.isRequired,
    disabled: PropTypes.bool.isRequired,
    hasArrow: PropTypes.bool
}

const styles = StyleSheet.create({
    buttonContainer:{
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        zIndex: 1,
    },
    buttonContainerOverride:{
        marginTop: -60,
    },
    shadowContainer: {
        shadowColor: colors.asphalt,
        shadowOffset: {
            width: 0,
            height: 10
        },
        shadowRadius: 14,
        shadowOpacity: 0.3,
        borderRadius: 10,
        width: 278,
        marginBottom: 35,
        marginLeft: 0,
        marginRight: 0,
    },
    buttonPrimary: {
        borderRadius: 10,
        backgroundColor: colors.greenBlue,

        paddingTop: 20,
        paddingBottom: 20,
        shadowColor: colors.asphalt,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowRadius: 4,
        shadowOpacity: 0.3        
    },
    arrowUp:{
        position: 'relative',
        zIndex: 2,
    },
    textStyle: {
        fontFamily: "TitilliumWeb-Bold",
        fontSize: 18,
        color: colors.whiteTwo,
    }
})
