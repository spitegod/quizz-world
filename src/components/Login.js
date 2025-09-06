import React, { useState } from "react";


function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Login: ", {email, password});
    };

    return (
        <div className="login-container">
            <h1 className="h1-logo">QuizzWorld</h1>
            <h2 className="h2-type-of-enter">Вход</h2>
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
                <button type="submit" className="button-enter">Войти</button>
            </form>
        </div>
    );
}

export default Login;