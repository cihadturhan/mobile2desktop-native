import React, {Component, PropTypes} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {List, ListItem} from 'react-native-elements';
import MessageListItem from './messageListItem';

class messageList extends Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        if (!this.props.messages.length) {
            return (<List containerStyle={styles.messages}>
                <ListItem
                    hideChevron={true}
                    title={'You have no messages'}
                />
            </List>)
        } else {
            return (<List containerStyle={styles.messages}>
                {
                    this.props.messages.map((message, i) => {
                        let bgIndex = (i > 3 ? 3 : i) + 1;
                        return <MessageListItem onCopy={this.props.onCopy} style={styles[`bg${bgIndex}`]} message={message} key={message.Uuid}/>
                    })
                }
            </List>);
        }
    }
}

messageList.propTypes = {
    messages: PropTypes.array.isRequired,
    onCopy: PropTypes.func
};

export default messageList;

const styles = StyleSheet.create({
    messages: {
        marginTop: 0,
    },
    bg1:{
        backgroundColor: 'rgb(248,248,248)'
    },
    bg2:{
        backgroundColor: 'rgb(245,245,245)'
    },
    bg3:{
        backgroundColor: 'rgb(240,240,240)'
    },
    bg4:{
        backgroundColor: 'rgb(235,235,235)'
    }
});