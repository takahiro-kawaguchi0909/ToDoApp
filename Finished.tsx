import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  NativeMethodsMixin
} from "react-native";
import { createSwitchNavigator } from "react-navigation";
import NavigationService from "./NavigationService";

export default function Finished(props: any) {
  const finishedTask = props?.navigation?.state?.params;
  const [sortedTask, setSortedTask] = useState<string[]>([]);

  var Views: any[] = [];
  for (let i = 0; i < finishedTask.length; i++) {
    Views.push(
      <View>  
        <Text>{finishedTask[i]}</Text>
      </View>
    );
  }

  function prpsSort(props: any) {
    const finishedTaskSort = finishedTask.sort();
    setSortedTask(finishedTaskSort);
    console.log(finishedTaskSort);
    console.log(sortedTask);

    var Views: any[] = [];

    for (let i = 0; i < sortedTask.length; i++) {
      Views.push(
        <View>
          <Text>{sortedTask[i]}</Text>
        </View>
      );

      return (
        <View style={styles.container}>
          <Text style={styles.title}>Finished Task</Text>
          <View style={styles.listItem}>{Views}</View>
        </View>
      );
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Finished Task</Text>
      <View style={styles.inputWrapper}>
        <Button title="Name Sort" onPress={prpsSort} />
      </View>
      <View style={styles.listItem}>{Views}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 35,
    alignItems: "center"
  },
  inputWrapper: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20
  },
  title: {
    fontSize: 40,
    marginBottom: 40,
    fontWeight: "bold",
    textDecorationLine: "underline"
  },
  listItem: {
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 10
  }
});
