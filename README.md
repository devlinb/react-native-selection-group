# react-native-selection-group

react-native-selection-group is the simplest way to create exclusive, or multi-selection groups of UI elements. From simple radio buttons, and survey questions, to any imaginably more complex use case.

The main benefit of this component is that it doesn't dictate to you how your UI will be drawn, it handles all the state and calls a render function you provide.

Check out the ExampleApp for more info.

## What's New
1.1 - New prop, getAllSelectedItemIndexes, if provided allows multi-selection will return all elements that are selected. You can pull in a default definition of getAllSelectedItemIndexes from SelectionHandler.

## Todo
* More examples, more documentation. 
* ~~Returning all selected items for the multi-selected case would be nice.~~
* Add typescript definitions.
* Some crazy example showing off using the accelerometer for selecting a component.

## How to use
1. Create a ``SelectionHandler``, preferably in a constructor. **The selection handler cannot change on each render, it must stick around**
2. Write a function that returns the component you want to render, that component needs some sort of way to be selected/activated. TouchableOpacity is a good start, but feel free to go wild. 
    * The function signature is ``renderComponent(data, index, isSelected, onPress)``. 
        * ``data`` will be the contents of ``items[index]``, ``items`` is passed into SelectionGroup (see below) 
        * ``index`` is the index of the option this component is rendering.
        * ``isSelected`` is a bool telling you if this component is the one that has been selected.
        * ``onPress`` is a function that *you must pass to your component's onPress handler*. You can use whatever onPress equivilent your component has, for example if your element is selected after being dragged around, then pass ``onPress`` to your components onTouchUp. 

``SelectionGroup`` has only a few props you need to worry about, and if you aren't customizing the component, you can just copy paste the code below, put your own style in ``containerStyle`` and pass in your array of choices to ``items`` and everything will work out for you. ``selectionHandler`` below is a new'd instance of ``SelectionHandler``.

```
const arrayOfChoices = ['First option', 'Second option', 'Third option']
<SelectionGroup 
  renderContent={this.renderButton}
  items={arrayOfChoices}
  onPress={this.selectionHandler.selectionHandler}
  isSelected={this.selectionHandler.isSelected}
  containerStyle={styles.answers}
  onItemSelected={(item) => this.setState({ selectedAnswer: item })}
/>
```

onItemSelected is called whenever the user's selection changes. You probably want to keep track of this, but if you don't care too much about code clarity, you can also do that in your renderContent function by triggering off of ``isSelected``.

## Advanced Usage
Multi-select support also exists. See [MultiselectScreen.js](https://github.com/devlinb/react-native-selection-group/blob/master/ExampleApp/screens/MultiselectScreen.js) for an example.

The items array can be filled with complex objects. Your render function is called with the entire array element, you choose what to do with it, so go wild. The ExampleApp shows this off.

You can use your own selection handlers, in case you want to do validation of the user's selections. The API for this is anemic right now, the selection handler needs to be passed the entire item to make it really useful.

## Example App
The example app is a vanilla RN project, download, run NPM install, then start it up as per usual. If you want to jump to the important code, look in the ``screens`` directory. ``SimpleScreen`` will get you up and started super quick and handle 90% of use cases. If you want to draw some simple Radio Buttons, grab the code from ``RadioButtonsScreen``, they aren't platform equivilent by any means, they are quick and dirty to show off what can be done. React Native Elements has super simple checkbox and radio buttons (radio buttons are under the Checkbox component) that do the job.

## Motivation
Other components that did this were super opinionated and insisted on wrapping passed in components with a ton of their own philisophies of how things should be done. Maybe those other components are right, maybe they are wrong, but with react-native-selection-group you can choose.

## Screenshots
![Survey Questions](https://i.imgur.com/I1qx6Pg.png)

---

![Multiple Selections](https://i.imgur.com/HiZUjzm.png)

---

![Radio Buttons](https://i.imgur.com/tlY99CI.png)

