import React, { useState } from "react";
import { useNavigate, BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";


function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Регистрация успешна!");
        localStorage.setItem("currentUser", JSON.stringify({email}));
        navigate("/")
    };

    return (
        <div>
            <nav>
                <ul>
                    <li><Link to="/login">Вход</Link></li>
                    <li><Link to="/register">Регистрация</Link></li>
                </ul>
            </nav>
            <div className="register-container">
                <h1 className="h1-logo">QuizzWorld</h1>
                <h2 className="h2-type-of-enter">Регистрация</h2>
                <form onSubmit={handleSubmit}>
                    <input
                    type="email"
                    placeholder="Почта"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    />
                    <input
                    type="password"
                    placeholder="Пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    />
                    <button type="submit" className="button-enter">Зарегистрироваться</button>
                </form>
            </div>
        </div>
    );
}

export default Register;