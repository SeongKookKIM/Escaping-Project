import Home from "../Pages/\bHome/Home";
import "./App.scss";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </main>
  );
}

export default App;
