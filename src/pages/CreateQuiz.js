import React, {useState} from "react";
import { useNavigate } from "react-router-dom";


function CreateQuiz() {
    const [title, setTitle] = useState("");
    const [questions, setQuestions] = useState([{question: "", answer: ""}]);
    const navigate = useNavigate();

    const handleQuestionChange = (index, field, value) => {
        const newQuestions = [...questions];
        newQuestions[index][field] = value;
        setQuestions(newQuestions);
    };

    const addQuestion = () => {
        setQuestions([...questions, {question: "", answer: ""}]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const quiz = { title, questions };
        localStorage.setItem("currentQuiz", JSON.stringify(quiz));

        alert("Викторина создана и сохранена!");
        setTitle("");
        setQuestions([{question: "", answer: ""}]);
        navigate("/");
    };

    return (
        <div style={{ maxWidth: "500px", margin: "50px auto", textAlign: "center" }}>
      <h2>Создание викторины</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Название викторины"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{ marginBottom: "15px", width: "100%" }}
        />
        {questions.map((q, i) => (
          <div key={i} style={{ marginBottom: "15px" }}>
            <input
              type="text"
              placeholder={`Вопрос ${i + 1}`}
              value={q.question}
              onChange={(e) => handleQuestionChange(i, "question", e.target.value)}
              required
              style={{ width: "60%" }}
            />
            <input
              type="text"
              placeholder="Правильный ответ"
              value={q.answer}
              onChange={(e) => handleQuestionChange(i, "answer", e.target.value)}
              required
              style={{ marginLeft: "10px", width: "35%" }}
            />
          </div>
        ))}
        <button type="button" onClick={addQuestion}>
          Добавить вопрос
        </button>
        <button type="submit" style={{ marginLeft: "10px" }}>
          Сохранить викторину
        </button>
      </form>
    </div>
    )
};

export default CreateQuiz;