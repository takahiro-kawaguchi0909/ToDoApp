import Finished from "./Finished";
import Home from "./Home";
import { createStackNavigator } from "react-navigation-stack";
import NavigationService from "./NavigationService";
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";

const TopLevelNavigator = createStackNavigator(
  {
    Home: { screen: Home },
    Finished: { screen: Finished }
  },
  {
    initialRouteName: "Home"
  }
);

const AppContainer = createAppContainer(TopLevelNavigator);

export default class App extends React.Component {
  render() {
    return (
      <AppContainer
        ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }}
      />
    );
  }
}
