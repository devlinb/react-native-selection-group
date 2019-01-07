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
        isSelected,
        containerStyle,
        renderContent,
        selectionHandler,
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
                    renderContent(
                        item,
                        i,
                        isSelected(i),
                        onPress(selectionHandler)
                    ));
            })}
        </View>
    );
};

export class SelectionHandler {
    constructor(maxMultiSelect) {
        this.selectedOption = null;
        this.maxSelected = maxMultiSelect || 1;
    }

    selectionHandler(index) {
        if (this.maxSelected === 1) {
            this.selectedOption = index;
        } else if (this.selectionOption) {
            this.selectionOption.push(index);
            if (this.selectionOption.length >= this.maxSelected) this.selectedOption.shift();
        } else {
            this.selectionOption = [index];
        }
    }

    isSelected(index) {
        if (!this.selectedOption) return false;
        if (typeof this.selectedOption === 'number') return index === this.selectedOption;
        return this.selectedOption.includes(index);
    }
}

SelectionGroup.propTypes = {
    items: PropTypes.arrayOf(PropTypes.func).isRequired,
    onPress: PropTypes.func.isRequired,
    isSelected: PropTypes.func.isRequired,
    containerStyle: ViewPropTypes.style,
    renderContent: PropTypes.func.isRequired,
    selectionHandler: PropTypes.func.isRequired,
    attributes: PropTypes.any
};

export default SelectionGroup;
