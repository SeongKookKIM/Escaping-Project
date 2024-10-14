import Home from "../Pages/\bHome/Home";
import Admission from "../Pages/Admission/Admission";
import Escape from "../Pages/Escape/Escape";
import Room from "../Pages/Room/Room";
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
        <Route path=":id" element={<Room />} />
        <Route path="/escape" element={<Escape />} />
      </Routes>
    </main>
  );
}

export default App;
