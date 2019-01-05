import PropTypes from 'prop-types';
import React from 'react';
import {
    View,
    ViewPropTypes
} from 'react-native';

const SelectionGroup = props => {
    const {
        items,
        onPress,
        selectedIndex,
        containerStyle,
        ...attributes
    } = props;

    /* Each function in the items array is called, we pass in its index, if it is selected, and  
     * finally we capture the index 'i' and wrap it in a lambda that will hand it off to the onPress function passed in
     * by our parent component. 
     * 
     * The lambda capture is the only smart thing this component does.
     */
    return (
        <View
            style={[{}, containerStyle && containerStyle]}    
            {...attributes}
        >
            {items.map((item, i) => {
                return (
                    item(
                        i,
                        selectedIndex === i,
                        onPress ? () => onPress(i) : () => { }
                    ));
            })}
        </View>
    );
};

SelectionGroup.propTypes = {
    items: PropTypes.arrayOf(PropTypes.func).isRequired,
    onPress: PropTypes.func.isRequired,
    selectedIndex: PropTypes.number,
    containerStyle: ViewPropTypes.style,
    attributes: PropTypes.any
};

export default SelectionGroup;
