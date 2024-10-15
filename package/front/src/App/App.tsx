import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../Pages/\bHome/Home";
const Admission = lazy(() => import("../Pages/Admission/Admission"));
const Escape = lazy(() => import("../Pages/Escape/Escape"));
const Room = lazy(() => import("../Pages/Room/Room"));
const Rooms = lazy(() => import("../Pages/Rooms/Rooms"));

import "./App.scss";
import Loading from "../Features/Loding/Loading";

function App() {
  return (
    <main>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admission" element={<Admission />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path=":id" element={<Room />} />
          <Route path="/escape" element={<Escape />} />
        </Routes>
      </Suspense>
    </main>
  );
}

export default App;
