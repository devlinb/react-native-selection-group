
import React, { Component } from 'react';
import { StyleSheet, Button, Text, TouchableOpacity, View } from 'react-native';
import SelectionGroup, { SelectionHandler } from 'react-native-selection-group';

const sampleQuestions = {
  questionText: 'This is a sample question showing you how to use a ButtonGroup',
  options: [
    {
      optionText: 'The first item',
      value: 'selection-group let\'s you render anything!'
    },
    {
      optionText: 'The second thing',
      value: 'Really, pick what you want!'
    },
    {
      optionText: 'And finally!',
      value: 'Complete freedom, at last!'
    }
  ]
};

export default class RadioButtonsScreen extends React.Component {
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
      style={styles.touchable}
    >
    <View style={styles.outerCircle}>
    { isSelected && <View style={styles.innerCircle} /> }
    </View>
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

const styles = {
  touchable: {
    margin: 10,
    height: 30,
    borderRadius: 10,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(0,0,0,0)',
    flexDirection: 'row',
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
    marginBottom: 10,
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(108,48,237,1)',
  },
  outerCircle: {
    borderRadius: 10,
    borderWidth: 2,
    width: 20,
    height: 20,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  innerCircle: {
    borderRadius: 10,
    width: 14,
    height: 14,
    borderColor: 'black',
    backgroundColor: 'black'
  },

};
