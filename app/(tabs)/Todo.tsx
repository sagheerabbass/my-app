import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Task = {
  id: string;
  text: string;
  image: string;
};

export default function Todo() {
  const [task, setTask] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    loadTasks();
  }, []);

  useEffect(() => {
    saveTasks();
  }, [tasks]);

  const saveTasks = async () => {
    try {
      await AsyncStorage.setItem("tasks", JSON.stringify(tasks));
    } catch (error) {
      console.log("Error saving tasks:", error);
    }
  };

  const loadTasks = async () => {
    try {
      const data = await AsyncStorage.getItem("tasks");
      if (data) setTasks(JSON.parse(data));
    } catch (error) {
      console.log("Error loading tasks:", error);
    }
  };

  const addOrUpdateTask = () => {
    if (task.trim() === "") return;

    if (editingId) {
      const updatedTasks = tasks.map((item) =>
        item.id === editingId ? { ...item, text: task, image: imageUrl || item.image } : item
      );
      setTasks(updatedTasks);
      setEditingId(null);
    } else {
      const newTask: Task = {
        id: Date.now().toString(),
        text: task,
        image:
          imageUrl.trim() !== ""
            ? imageUrl
            : "https://cdn-icons-png.flaticon.com/512/992/992651.png",
      };
      setTasks([...tasks, newTask]);
    }

    setTask("");
    setImageUrl("");
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((item) => item.id !== id));
  };

  const startEditing = (task: Task) => {
    setTask(task.text);
    setImageUrl(task.image);
    setEditingId(task.id);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>📝 To-Do List</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter a new task..."
          value={task}
          onChangeText={setTask}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Image URL (optional)"
          value={imageUrl}
          onChangeText={setImageUrl}
        />
        <TouchableOpacity style={styles.addButton} onPress={addOrUpdateTask}>
          <Text style={styles.addButtonText}>
            {editingId ? "Update" : "Add"}
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskContainer}>
            <Image source={{ uri: item.image }} style={styles.taskImage} />
            <Text style={styles.taskText}>{item.text}</Text>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => startEditing(item)}
            >
              <Text style={styles.editText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => deleteTask(item.id)}>
              <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F5F5", padding: 20 },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },
  inputContainer: { flexDirection: "row", marginBottom: 10 },
  input: {
    flex: 1,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#fff",
  },
  addButton: {
    backgroundColor: "#007BFF",
    paddingHorizontal: 20,
    marginLeft: 10,
    justifyContent: "center",
    borderRadius: 8,
  },
  addButtonText: { color: "#fff", fontWeight: "bold" },
  taskContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  taskImage: { width: 40, height: 40, borderRadius: 6, marginRight: 10 },
  taskText: { flex: 1, fontSize: 16 },
  editButton: {
    marginRight: 10,
  },
  editText: {
    fontSize: 16,
    color: "green",
  },
  deleteText: { fontSize: 16, color: "red" },
});
