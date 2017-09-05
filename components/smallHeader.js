import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import colors from '../styles/colors';

export class SmallHeader extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.smallHeader}>Your History</Text>
            </View>
        )
    }
}

export default SmallHeader;

const styles = StyleSheet.create({
    container:{
        height: 50,
        marginTop: -50,
        shadowColor: "rgba(0, 0, 0, 0.2)",
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowRadius: 3,
        shadowOpacity: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        position: 'relative',
        zIndex: 0,
    },
    smallHeader: {
        lineHeight: 21,
        marginBottom: 6,
        fontFamily: "TitilliumWeb-Regular",
        fontSize: 14,
        textAlign: "center",
        color: colors.marineBlue,
    }
});