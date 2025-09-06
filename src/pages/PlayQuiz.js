import React, { useState, useEffect } from "react";

function PlayQuiz() {
  const [quiz, setQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [finished, setFinished] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const storedQuiz = JSON.parse(localStorage.getItem("currentQuiz"));
    if (storedQuiz) {
      setQuiz(storedQuiz);
    }
  }, []);

  if (!quiz) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        Викторина не найдена
      </div>
    );
  }

  const handleAnswerChange = (value) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = value;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // считаем правильные ответы
      let correct = 0;
      quiz.questions.forEach((q, i) => {
        if (
          answers[i] &&
          answers[i].trim().toLowerCase() === q.answer.trim().toLowerCase()
        ) {
          correct++;
        }
      });
      setScore(correct);
      setFinished(true);
    }
  };

  if (finished) {
    return (
      <div style={{ maxWidth: "500px", margin: "50px auto", textAlign: "center" }}>
        <h2>{quiz.title}</h2>
        <h3>
          Результат: {score} из {quiz.questions.length}
        </h3>
        <button onClick={() => window.location.reload()}>Пройти снова</button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "500px", margin: "50px auto", textAlign: "center" }}>
      <h2>{quiz.title}</h2>
      <p>
        Вопрос {currentQuestion + 1} из {quiz.questions.length}
      </p>
      <p style={{ fontWeight: "bold" }}>
        {quiz.questions[currentQuestion].question}
      </p>
      <input
        type="text"
        placeholder="Ваш ответ"
        value={answers[currentQuestion] || ""}
        onChange={(e) => handleAnswerChange(e.target.value)}
      />
      <div style={{ marginTop: "20px" }}>
        <button onClick={handleNext}>
          {currentQuestion < quiz.questions.length - 1
            ? "Следующий вопрос"
            : "Завершить викторину"}
        </button>
      </div>
    </div>
  );
}

export default PlayQuiz;
