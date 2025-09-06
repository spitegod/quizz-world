import React, {useState} from "react";


function CreateQuiz() {
    const [title, setTitle] = useState("");
    const [questions, setQuestions] = useState([""]);

    const handleQuestionChange = (index, value) => {
        const newQuestions = [...questions];
        newQuestions[index] = value;
        setQuestions(newQuestions);
    };

    const addQuestion = () => {
        setQuestions([...questions, ""]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        localStorage.setItem("currentQuiz", JSON.stringify(quiz));

        alert("Викторина создана и сохранена!");
        setTitle("");
        setQuestions([""]);
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
                />
                {questions.map((q, i) => (
                    <input
                      key={i}
                      type="text"
                      placeholder={`Вопрос ${i + 1}`}
                      value={q}
                      onChange={(e) => handleQuestionChange(i, e.target.value)}
                      required
                    />
                ))}
                <button type="button" onClick={addQuestion}>Добавить вопрос</button>
                <button type="submit">Создать викторину</button>
            </form>
        </div>
    )
};

export default CreateQuiz;