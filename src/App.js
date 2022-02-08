import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Components/Login/Login/Login";
import Register from "./Components/Login/Register/Register";
import Navbar from "./Components/Share/Navbar/Navbar";
import Footer from "./Components/Share/Footer/Footer";
import Home from "./Components/Home/Home";
import AuthProvider from "./contexts/AuthProvider";

function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <Navbar></Navbar>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
          <Footer></Footer>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
