
import React, { Component } from 'react';
import { StyleSheet, Button, Text, TouchableOpacity, View } from 'react-native';
import SelectionGroup, { SelectionHandler } from 'react-native-selection-group';

const sampleQuestions = {
    questionText: 'This is a sample question showing you how to use a ButtonGroup',
    options: [
        {
            optionText: '1',
            value: 'Your data1'
        },
        {
            optionText: '2',
            value: 'Your data2'
        },
        {
            optionText: '3',
            value: 'Your data3'
        },
        {
            optionText: '4',
            value: 'Your data4'
        },
        {
            optionText: '5',
            value: 'Your data5'
        },
        {
            optionText: '6',
            value: 'Your data6'
        },
        {
            optionText: '7',
            value: 'Your data7'
        },
        {
            optionText: '8',
            value: 'Your data8'
        },
        {
            optionText: '9',
            value: 'Your data9'
        },
    ]
};

const MAX_SELECT = 4;

/**
 * react-native-selection-group  doesn't currently pass back all selected items when multi-selection is enabled,
 * just the latest item, so you have to track which items are valid yourself. onItemSelected does this here.
*/
export default class MultiselectScreen extends React.Component {

    constructor(props) {
        super(props);
        this.selectionHandler = new SelectionHandler({ maxMultiSelect: MAX_SELECT, allowDeselect: true, defaultSelection: null });
        this.state = {
            selectedItems: null
        };
    }

    
    onItemSelected = (item, allSelectedItems) => {
        this.setState({ selectedItems: allSelectedItems });
    }

    /** 
     * The callback you pass to the SeletionGroup needs to take in these parameters.
     * Feel free to chain your own onPress stuff after what calling the passed in onPress, for example
     * onPress={ () => { 
     *   onPress();
     *   yourOwnCode;
     * }}
     */
    renderButton = (data, index, isSelected, onPress) => {
        return (<TouchableOpacity
            onPress={onPress}
            key={index}
            style={[styles.button,
            { backgroundColor: isSelected ? 'rgba(78,142,255,1)' : 'rgba(141,196,63,1)' }]}
        >
            <Text>{data.optionText}</Text>
        </TouchableOpacity>
        );
    }

    render() {
        return (
            <View style={styles.background}>
                <View style={styles.container}>
                    <Text style={styles.text}>{sampleQuestions.questionText}</Text>
                    <SelectionGroup
                        renderContent={this.renderButton}
                        items={sampleQuestions.options}
                        onPress={this.selectionHandler.selectionHandler}
                        isSelected={this.selectionHandler.isSelected}
                        getAllSelectedItemIndexes={this.selectionHandler.getAllSelectedItemIndexes}
                        containerStyle={styles.answers}
                        onItemSelected={(item, allSelectedItems) => this.onItemSelected(item, allSelectedItems)}
                    />
                    <Text style={styles.text}>
                        {this.state.selectedItems ? JSON.stringify(this.state.selectedItems) : 'Select something!'}
                    </Text>
                </View>
            </View>);
    }
}

const styles = StyleSheet.create({
    button: {
        margin: 10,
        height: 40,
        width: 40,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        width: '60%',
        alignItems: 'stretch',
        justifyContent: 'center',
        backgroundColor: 'white',
        elevation: 20,
        borderRadius: 10,
    },
    text: {
        margin: 10,
        fontSize: 20,
    },
    answers: {
        alignSelf: 'center',
        marginBottom: 10,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(108,48,237,1)',
    },
});
