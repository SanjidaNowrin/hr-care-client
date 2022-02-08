import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Components/Home/Home/Home";
import Login from "./Components/Login/Login/Login";
import Register from "./Components/Login/Register/Register";


function App() {
  return (
    <>

      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
