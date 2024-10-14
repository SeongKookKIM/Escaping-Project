import style from "./Header.module.scss";
import { HeaderProps } from "../../Entries/HeaderNavigation/HeaderModel";
import { useNavigate } from "react-router-dom";
import { removeData } from "../../Shared/Utils/LocalStorageHelpers";

function Header({ backBtn, homeBtn, retryBtn }: HeaderProps) {
  const navigate = useNavigate();

  const handlerRetry = () => {
    removeData("correctAnswers");
    navigate("/");
  };

  return (
    <div className={style.header}>
      {backBtn && (
        <button
          type="button"
          className={style.backBtn}
          onClick={() => navigate("/rooms")}
        >
          ← Rooms
        </button>
      )}
      <h3>@Escaping</h3>

      {homeBtn && (
        <button
          type="button"
          className={style.homeBtn}
          onClick={() => navigate("/")}
        >
          ← Home
        </button>
      )}

      {retryBtn && (
        <button
          type="button"
          className={style.retryBtn}
          onClick={() => handlerRetry()}
        >
          다시하기
        </button>
      )}
    </div>
  );
}

export default Header;
