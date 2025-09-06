import React, {useState, useEffect} from "react";


function PlayQuiz() {
    const [quiz, setQuiz] = useState(null);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState([]);

    useEffect(() => {
        const storedQuiz = JSON.parse(localStorage.getItem("currentQuiz"));
        if (storedQuiz) {
            setQuiz(storedQuiz);
        }
    }, []);

    if (!quiz) {
        return <div>Викторина не найдена</div>;
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
            alert(`Викторина завершена! Ваши ответы:\n${answers.join("\n")}`);
            setCurrentQuestion(0);
            setAnswers([]);
        }
    };

    return (
        <div style={{ maxWidth: "500px", margin: "50px auto", textAlign: "center" }}>
        <h2>{quiz.title}</h2>
        <p>Вопрос {currentQuestion + 1} из {quiz.questions.length}</p>
        <p>{quiz.questions[currentQuestion]}</p>
        <input
            type="text"
            placeholder="Ваш ответ"
            value={answers[currentQuestion] || ""}
            onChange={(e) => handleAnswerChange(e.target.value)}
        />
        <div style={{ marginTop: "20px" }}>
            <button onClick={handleNext}>
            {currentQuestion < quiz.questions.length - 1 ? "Следующий вопрос" : "Завершить викторину"}
            </button>
        </div>
        </div>
  );

};

export default PlayQuiz;