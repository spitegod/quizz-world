import React, {useState} from "react";
import { useNavigate, Link } from "react-router-dom";


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
    
    const handleLogout = () => {
        localStorage.removeItem("currentUser");
        navigate("/login");
    };

    return (
    <div>
        <nav>
            <ul className="ul-homepage">
                <li><Link to="/">Главная</Link></li>
                <li><Link to="/login" onClick={handleLogout}>Выйти</Link></li>
            </ul>
        </nav>
        <div className="create-quiz-container">
        <h2>Создание викторины</h2>
        <form onSubmit={handleSubmit}>
            <input
            type="text"
            placeholder="Название викторины"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            />
            {questions.map((q, i) => (
            <div key={i} className="question-row">
                <input className="input input-question"
                type="text"
                placeholder={`Вопрос ${i + 1}`}
                value={q.question}
                onChange={(e) => handleQuestionChange(i, "question", e.target.value)}
                required
                />
                <input className="input input-right-answer"
                type="text"
                placeholder="Правильный ответ"
                value={q.answer}
                onChange={(e) => handleQuestionChange(i, "answer", e.target.value)}
                required
                />
            </div>
            ))}
            <button className="button button-add-question" type="button" onClick={addQuestion}>
            Добавить вопрос
            </button>
            <button className="button button-save-quiz" type="submit">
            Сохранить викторину
            </button>
        </form>
        </div>
    </div>
    )
};

export default CreateQuiz;