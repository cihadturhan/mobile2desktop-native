import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Clipboard, StyleSheet, View, Text, Easing} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {ListItem} from 'react-native-elements';
import colors from '../styles/colors';

const AnimatedListItem = Animatable.createAnimatableComponent(ListItem);

const slideDown = {
    0: {
        translateY: -10,
        opacity: 0,
    },
    1: {
        translateY: 0,
        opacity: 1,
    },
};

const leftIconColors = [
    colors.azul,
    colors.fadedRed,
    colors.greenBlue
]

import moment from 'moment';
import constants from 'paste-n-sync-constants';

class messageListItem extends Component {
    constructor(props, context) {
        super(props, context);
    }

    _setClipboardContent() {
        Clipboard.setString(this.props.message.content);
        this.props.onCopy && this.props.onCopy();
    }

    render() {
        let message = this.props.message;
        return (
            <Animatable.View
                animation={slideDown}
                easing="ease-out-cubic"
                iterationCount={1}
                style={[styles.animatable, this.props.style? this.props.style : {}]}
                duration={300}>
                {<ListItem
                    onPress={this._setClipboardContent.bind(this)}
                    hideChevron={message.type != constants.TYPES.TEXT}
                    style={styles.listItem}
                    rightIcon={{name: 'content-copy'}}
                    key={message.Uuid}
                    title={message.content}
                    leftIcon={
                        <View style={[styles.leftIcon, {borderColor: leftIconColors[this.props.index % leftIconColors.length]}]}></View>
                    }
                    subtitle={
                        <View style={styles.subtitleView}>
                            <Text style={styles.ratingText}>{moment(message.createdAt).fromNow(true)}</Text>
                        </View>
                    }
        />}</Animatable.View>);
    }
}

messageListItem.propTypes = {
    message: PropTypes.object.isRequired,
    style: PropTypes.any,
    onCopy: PropTypes.func
};

export default messageListItem;

const styles = StyleSheet.create({
    leftIcon:{
        width: 10,
        height: 10,
        marginRight: 10,
        backgroundColor: 'transparent',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'red',
        alignSelf: 'center',
    },
    subtitleView: {
        flexDirection: 'row',
        paddingLeft: 10,
        paddingTop: 5
    },
    animatable:{
        marginTop: 0,
    },
    listItem:{
        paddingTop: 15,
        paddingBottom: 15,
        borderColor: colors.lightBlueGrey,
        borderBottomWidth: 1,
    },
    ratingText: {
        paddingLeft: 10,
        color: 'grey',
        fontSize: 12
    },
});