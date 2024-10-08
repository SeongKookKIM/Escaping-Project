import Home from "../Pages/\bHome/Home";
import Admission from "../Pages/Admission/Admission";
import Rooms from "../Pages/Rooms/Rooms";
import "./App.scss";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admission" element={<Admission />} />
        <Route path="/rooms" element={<Rooms />} />
      </Routes>
    </main>
  );
}

export default App;
