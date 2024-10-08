import Logo from "../../assets/Logo.png";
import landingBg from "../../assets/Landing-bg.png";
import style from "./Home.module.scss";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { loadData } from "../../Shared/Utils/LocalStorageHelpers";

function Home() {
  const [isCheckEntry, setIsCheckEntry] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    const saved = loadData("correctAnswers");
    if (saved) {
      if (saved.includes("0127")) {
        setIsCheckEntry(true);
      }
    }
  }, []);

  // 입장 여부 확인 후 경로 변경
  const handleCheckEntry = () => {
    if (isCheckEntry) {
      navigate("/rooms");
    } else {
      navigate("/admission");
    }
  };

  return (
    <div className={style.home}>
      <img src={Logo} alt="Logo" className={style.logo} />
      <div className={style.landingBgContainer}>
        <img src={landingBg} alt="Landing-Bg" className={style.landingBg} />
        <p>
          당신은 디지털 요새라는 이름의 가상 세계에 갇히게 됩니다. <br />
          이 요새는 다양한 문제로 가득 차 있습니다. <br /> 요새를 탈출하고
          우승자가 되기 위해서는 모든 문제를 해결해야 합니다.
        </p>
      </div>
      <button
        type="button"
        className={style.startBtn}
        onClick={handleCheckEntry}
      >
        시작하기
      </button>
    </div>
  );
}

export default Home;
