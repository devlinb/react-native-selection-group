
import React, { Component } from 'react';
import { StyleSheet, Button, Text, TouchableOpacity, View } from 'react-native';
import SelectionGroup, { SelectionHandler } from 'react-native-selection-group';

const sampleQuestions = {
  questionText: 'This is a sample question showing you how to use a ButtonGroup',
  options: [
    {
      optionText: 'The first item',
      value: 'The complete object is returned to you, put whatever you want here!'
    },
    {
      optionText: 'The second item',
      value: 52
    },
    {
      optionText: 'One more!',
      value: { text: 'This component is seriously flexible', number: 124 }
    }
  ]
};

export default class SimpleScreen extends React.Component {

  constructor(props) {
    super(props);
    this.selectionHandler = new SelectionHandler(1);
    this.state = {
      selectedAnswer: null
    };
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
        containerStyle={styles.answers}
        onItemSelected={(item) => this.setState({ selectedAnswer: item.value })}
      />
      <Text style={styles.text}>
        {this.state.selectedAnswer ? JSON.stringify(this.state.selectedAnswer) : 'Select something!'}
      </Text>
    </View>
    </View>);
  }
}

const styles = StyleSheet.create({
  button: {
    margin: 10,
    height: 30,
    width: 140,
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
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(108,48,237,1)',
  },
});
