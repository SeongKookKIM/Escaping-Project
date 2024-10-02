import { useState } from "react";
import "./App.css";

function App() {
  const [isLogin, setIsLogin] = useState<boolean>(false);

  const handlerLogin = () => {
    setIsLogin(!isLogin);
  };

  return (
    <button type="button" onClick={handlerLogin}>
      {isLogin ? "Logout" : "Login"}
    </button>
  );
}

export default App;
