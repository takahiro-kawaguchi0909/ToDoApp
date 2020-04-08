import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import NavigationService from "./NavigationService";
import DateTimePickerModal from "react-native-modal-datetime-picker";

interface IToDo {
  text: string;
  completed: boolean;
  limitTime: number;
}

export default function Home() {
  const [value, setValue] = useState<string>("");
  const [timeLimit, setTimeLimit] = useState<number>(Date.now());
  const [toDoList, setToDos] = useState<IToDo[]>([]);
  const [error, showError] = useState<Boolean>(false);
  const [finishedTask, setFinishedTask] = useState<string[]>([]);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const handleSubmit = (): void => {
    if (value.trim())
      setToDos([...toDoList, { text: value, completed: false ,limitTime: timeLimit}]);
    else showError(true);
    setValue("");
  };

  const removeItem = (index: number): void => {
    const newToDoList = [...toDoList];
    newToDoList.splice(index, 1);
    setToDos(newToDoList);
  };

  const toggleComplete = (toDo: IToDo, index: number): void => {
    const newToDoList = [...toDoList];
    newToDoList[index].completed = !newToDoList[index].completed;
    setFinishedTask([...finishedTask, toDo.text]);
    console.log(finishedTask);
    setToDos(newToDoList);
  };

  const goToFinish = () => {
    console.log(finishedTask);
    NavigationService.navigate("Finished", finishedTask);
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    console.warn("A date has been picked: ", date);
    setTimeLimit(date)
    hideDatePicker();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todo List</Text>
      <View style={styles.inputWrapper}>
        <TextInput
          placeholder="Enter your todo task..."
          value={value}
          onChangeText={e => {
            setValue(e);
            showError(false);
          }}
          style={styles.inputBox}
        />
        <Button title="time limit" onPress={showDatePicker} />
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="datetime"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      </View>
      <View>
        <Button title="Add Task" onPress={handleSubmit} />
      </View> 
      {error && (
        <Text style={styles.error}>Error: Input field is empty...</Text>
      )}
      <Text style={styles.subtitle}>Your Task :</Text>
      {toDoList.length === 0 && <Text>No to do task available</Text>}
      {toDoList.map((toDo: IToDo, index: number) => (
        <>
        <View style={styles.listItem} key={`${index}_${toDo.text}_${toDo.limitTime.toString()}`}>
          <Text
            style={[
              styles.task,
              { textDecorationLine: toDo.completed ? "line-through" : "none" }
            ]}
          >
            {toDo.text}
          </Text>
          <Text
            style={[
              styles.task,
              { textDecorationLine: toDo.completed ? "line-through" : "none" }
            ]}
          >
            {toDo.limitTime.toString()}
          </Text>
        </View>
          <View>
          
          <Button
            disabled={toDo.completed}
            title={toDo.completed ? "Completed" : "Complete"}
            onPress={() => toggleComplete(toDo, index)}
          />
          <Button
            title="X"
            onPress={() => {
              removeItem(index);
            }}
            color="crimson"
          />
        </View>
        </>
      ))}
      <View>
        <Button title="Go To Finished TaskList" onPress={goToFinish} />
      </View>
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
  inputBox: {
    width: 200,
    borderColor: "purple",
    borderRadius: 8,
    borderWidth: 2,
    paddingLeft: 8
  },
  title: {
    fontSize: 40,
    marginBottom: 40,
    fontWeight: "bold",
    textDecorationLine: "underline"
  },
  subtitle: {
    fontSize: 20,
    marginBottom: 20,
    color: "purple"
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 10
  },
  addButton: {
    alignItems: "flex-end"
  },
  task: {
    width: 200
  },
  error: {
    color: "red"
  }
});
