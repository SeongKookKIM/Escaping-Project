import { useState } from "react";

import "./App.module.scss";
import Home from "../Pages/Home/Home";
import Test from "../Pages/Test/Test";

function App() {
  const [isLogin, setIsLogin] = useState<boolean>(false);

  const handlerLogin = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div>
      <button type="button" onClick={handlerLogin}>
        {isLogin ? "Logout" : "Login"}
      </button>
      <div className="module-test">
        <p>모듈 테스트</p>
      </div>
      <Home />
      <Test />
    </div>
  );
}

export default App;
