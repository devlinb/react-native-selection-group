import PropTypes from 'prop-types';
import React from 'react';
import {
    View,
    ViewPropTypes
} from 'react-native';

/**
 * The only real strict requirement is that 'items' is an array of objects all of which have a field 
 * called 'optionText'.
 * 
 * onPress should probably be Selectionhandler.selectionHandler, same for isSelected. 
 * 
 * If you are using SelectionHandler, it is important that if you change the *items* prop, you hand 
 * over a *new instance* of SelectionHandler. See the ExampleApp for how to do this. Each group of 
 * questions can get its own SelectionHandler, just put everything in parallel arrays. 
 * 
 * Better yet just use the upcoming react-native-survey component that'll handle all of this for you.
 * 
 */
export default class SelectionGroup extends React.Component {
    render() {
        const {
            items,
            onPress,
            isSelected,
            containerStyle,
            renderContent,
            onItemSelected,
            ...attributes
        } = this.props;
        
        /**
         * forceUpdate is called below to ensure a re-render happens, in case for whatever reason 
         * the client of this component doesn't take any action that forces a redraw.
         * This is actually super inefficent code, all elements are redrawn when any single element is touched.
         */
        return (
            <View
                style={[{}, containerStyle && containerStyle]}
                {...attributes}
            >
                {items.map((item, i) =>
                    renderContent(
                        item,
                        i,
                        isSelected(i),
                        () => { this.forceUpdate(); if (onItemSelected) onItemSelected(item); onPress(i); }
                    )
                )}
            </View>
        );
    }
}

export class SelectionHandler {
    constructor(maxMultiSelect = 1) {
        this.selectedOption = null;
        this.maxSelected = maxMultiSelect;
    }

    selectionHandler = (index) => {
        if (this.maxSelected === 1) {
            this.selectedOption = index;
        } else if (this.selectionOption) {
            this.selectionOption.push(index);
            if (this.selectionOption.length >= this.maxSelected) this.selectedOption.shift();
        } else {
            this.selectionOption = [index];
        }
        
    }

    isSelected = (index) => {
        if (this.selectedOption === null) return false;
        if (typeof this.selectedOption === 'number') return index === this.selectedOption;
        return this.selectedOption.includes(index);
    }
}

SelectionGroup.propTypes = {
    items: PropTypes.array.isRequired,
    onPress: PropTypes.func.isRequired,
    isSelected: PropTypes.func.isRequired,
    containerStyle: ViewPropTypes.style,
    renderContent: PropTypes.func.isRequired,
    onItemSelected: PropTypes.func,
    attributes: PropTypes.any
};
