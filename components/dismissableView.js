import React from 'react';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';

export default (Comp) => {
    return ({ children, ...props }) => (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Comp {...props}>
                {children}
            </Comp>
        </TouchableWithoutFeedback>
    );
};