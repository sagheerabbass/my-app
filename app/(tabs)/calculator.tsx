import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function App() {
  const [input, setInput] = useState("");

  const handlePress = (value) => {
    if (value === "C") {
      setInput("");
    } else if (value === "=") {
      try {
        setInput(eval(input).toString());
      } catch {
        setInput("Error");
      }
    } else {
      setInput(input + value);
    }
  };

  const buttons = [
    ["C", "/", "*", "⌫"],
    ["7", "8", "9", "-"],
    ["4", "5", "6", "+"],
    ["1", "2", "3", "="],
    ["0", ".",],
  ];

  const handleBackspace = () => {
    setInput(input.slice(0, -1));
  };

  return (
    <View style={styles.container}>
      <View style={styles.displayContainer}>
        <Text style={styles.displayText}>{input || "0"}</Text>
      </View>

      <View style={styles.buttonContainer}>
        {buttons.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((buttonValue) => (
              <TouchableOpacity
                key={buttonValue}
                style={[
                  styles.button,
                  buttonValue === "=" && styles.equalsButton,
                  buttonValue === "C" && styles.clearButton,
                ]}
                onPress={() =>
                  buttonValue === "⌫"
                    ? handleBackspace()
                    : handlePress(buttonValue)
                }
              >
                <Text style={styles.buttonText}>{buttonValue}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1e1e1e",
    justifyContent: "flex-end",
  },
  displayContainer: {
    flex: 1,
    justifyContent: "flex-end",
    padding: 20,
  },
  displayText: {
    fontSize: 48,
    color: "#fff",
    textAlign: "right",
  },
  buttonContainer: {
    paddingBottom: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#333",
    flex: 1,
    margin: 5,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    height: 80,
  },
  buttonText: {
    fontSize: 28,
    color: "#fff",
  },
  equalsButton: {
    backgroundColor: "#ff9500",
  },
  clearButton: {
    backgroundColor: "#ff3b30",
  },
});
