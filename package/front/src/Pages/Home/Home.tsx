import Logo from "../../assets/Logo.png";
import landingBg from "../../assets/Landing-bg.png";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home">
      <img src={Logo} alt="Logo" className="logo" />
      <div className="landingBgContainer">
        <img src={landingBg} alt="Landing-Bg" className="landingBg" />
        <p>
          당신은 디지털 요새라는 이름의 가상 세계에 갇히게 됩니다. <br />
          이 요새는 다양한 문제로 가득 차 있습니다. <br /> 요새를 탈출하고
          우승자가 되기 위해서는 모든 문제를 해결해야 합니다.
        </p>
      </div>
      <button
        type="button"
        className="startBtn"
        onClick={() => navigate("/admission")}
      >
        시작하기
      </button>
    </div>
  );
}

export default Home;
