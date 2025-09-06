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
            <nav>
                <ul className="ul-homepage">
                    <li><Link to="/">Главная</Link></li>
                    <li ><Link to="/login" onClick={handleLogout}>Выйти</Link></li>
                </ul>
            </nav>
        
            <div className="homepage">
                <h1>Добро пожаловать, {user.email}!</h1>
                <p>В будущем здесь будут ваши викторины</p>
                <Link to="/create-quiz">
                    <button className="button button-create-quiz">Создать викторину</button>
                </Link>
                <Link to="/play-quiz">
                    <button className="button button-start-quiz">Пройти викторину</button>
                </Link>
            </div>
        </div>
    )
};

export default Home;