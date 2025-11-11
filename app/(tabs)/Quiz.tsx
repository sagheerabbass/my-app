import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function App() {
  const questions = [
    {
      text: "What is the capital of France?",
      options: ["London", "Berlin", "Paris", "Madrid"],
      correct: "Paris",
    },
    {
      text: "What is the capital of Pakistan?",
      options: ["Islamabad", "Karachi", "Lahore", "Peshawar"],
      correct: "Islamabad",
    },
    {
      text: "What is the capital of Iran?",
      options: ["Islamabad", "Karachi", "Lahore", "Tehran"],
      correct: "Tehran",
    },
    {
      text: "What is the capital of India?",
      options: ["Islamabad", "Mumbai", "Lahore", "New Delhi"],
      correct: "New Delhi",
    },
    {
      text: "What is the capital of China?",
      options: ["Islamabad", "Karachi", "Shanghai", "Beijing"],
      correct: "Beijing",
    },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(0);
  const [quizOver, setQuizOver] = useState(false);

  const handleSelect = (option) => {
    setSelectedOption(option);

    if (option === questions[currentQuestion].correct) {
      setFeedback("✅ Correct!");
      setScore(score + 1);
    } else {
      setFeedback("❌ Incorrect!");
    }
  };

  const handleNext = () => {
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
      setFeedback("");
    } else {
      setQuizOver(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setFeedback("");
    setScore(0);
    setQuizOver(false);
  };

  if (quizOver) {
    return (
      <View style={styles.container}>
        <Text style={styles.question}>🎉 Quiz Completed!</Text>
        <Text style={styles.scoreText}>
          Your Score: {score} / {questions.length}
        </Text>

        <TouchableOpacity style={styles.nextButton} onPress={handleRestart}>
          <Text style={styles.nextButtonText}>Restart Quiz</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const current = questions[currentQuestion];

  return (
    <View style={styles.container}>
      <Text style={styles.question}>
        Q{currentQuestion + 1}. {current.text}
      </Text>

      {current.options.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.optionButton,
            selectedOption === option && styles.selectedOption,
          ]}
          onPress={() => handleSelect(option)}
          disabled={selectedOption !== null} // prevent reselect
        >
          <Text style={styles.optionText}>{option}</Text>
        </TouchableOpacity>
      ))}

      {feedback !== "" && <Text style={styles.feedback}>{feedback}</Text>}

      {selectedOption && (
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>
            {currentQuestion + 1 === questions.length ? "Finish" : "Next"}
          </Text>
        </TouchableOpacity>
      )}

      <Text style={styles.score}>Score: {score}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    padding: 20,
  },
  question: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  optionButton: {
    backgroundColor: "#4CAF50",
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
  },
  selectedOption: {
    backgroundColor: "#2196F3",
  },
  optionText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
  },
  feedback: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  nextButton: {
    marginTop: 25,
    backgroundColor: "#FF9800",
    padding: 15,
    borderRadius: 10,
  },
  nextButtonText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
  },
  score: {
    marginTop: 15,
    fontSize: 18,
    textAlign: "center",
  },
  scoreText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },
});
