import Home from "../Pages/\bHome/Home";
import Admission from "../Pages/Admission/Admission";
import "./App.scss";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <main className="main">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admission" element={<Admission />} />
      </Routes>
    </main>
  );
}

export default App;
