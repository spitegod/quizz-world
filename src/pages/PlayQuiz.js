import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

function PlayQuiz() {
  const [quiz, setQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [finished, setFinished] = useState(false);
  const [score, setScore] = useState(0);
  const navigate = useNavigate();

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
  const handleLogout = () => {
        localStorage.removeItem("currentUser");
        navigate("/login");
    };

  if (finished) {
    return (
        <div>
            <nav>
                <ul className="ul-homepage">
                    <li><Link to="/">Главная</Link></li>
                    <li><Link to="/login" onClick={handleLogout}>Выйти</Link></li>
                </ul>
            </nav>
            <div style={{ maxWidth: "500px", margin: "50px auto", textAlign: "center" }}>
                <h2>{quiz.title}</h2>
                <h3>
                Результат: {score} из {quiz.questions.length}
                </h3>
                <button onClick={() => window.location.reload()} className="button button-retry">Пройти снова</button>
        </div>
      </div>
    );
  }

  return (
    <div>
        <nav>
            <ul className="ul-homepage">
                <li><Link to="/">Главная</Link></li>
                <li><Link to="/login" onClick={handleLogout}>Выйти</Link></li>
            </ul>
        </nav>
        <div className="quiz">
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
                <button onClick={handleNext} className="button button-next-question">
                {currentQuestion < quiz.questions.length - 1
                    ? "Следующий вопрос"
                    : "Завершить викторину"}
                </button>
            </div>
        </div>
    </div>
  );
}

export default PlayQuiz;
