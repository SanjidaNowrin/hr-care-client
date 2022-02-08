import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Teams from "./Components/Home/Teams/Teams";
import Login from "./Components/Login/Login/Login";
import Register from "./Components/Login/Register/Register";
import Navbar from "./Components/Share/Navbar/Navbar";

function App() {
    return (
        <>
            <Router>
                <Navbar></Navbar>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/team" element={<Teams />} />
                </Routes>
            </Router>
        </>
    );
}

export default App;
