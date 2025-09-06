import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./pages/Home";
import CreateQuiz from './pages/CreateQuiz';
import PlayQuiz from "./pages/PlayQuiz";

function App() {
  return (
    <Router>
      <div>
        

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/create-quiz" element={<CreateQuiz />} />
          <Route path="/play-quiz" element={<PlayQuiz />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
