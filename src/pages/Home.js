import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


function Home() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const currentUser = JSON.parse(localStorage.getItem("currentUser"));
        if (!currentUser) {
            navigate("/login");
        } else {
            setUser(currentUser);
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("currentUser");
        navigate("/login");
    };

    if (!user) return null;

    return (
        <div>
            <h1>Добро пожаловать, {user.email}!</h1>
            <p>Здесь будут викторины</p>
            <Link to="/create-quiz">
                <button>Создать викторину</button>
            </Link>
            <button onClick={handleLogout}>Выйти</button>
        </div>
    )
};

export default Home;