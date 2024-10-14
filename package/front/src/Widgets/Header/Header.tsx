import style from "./Header.module.scss";
import { HeaderProps } from "../../Entries/HeaderNavigation/HeaderModel";
import { useNavigate } from "react-router-dom";

function Header({ backBtn, homeBtn }: HeaderProps) {
  const navigate = useNavigate();

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
    </div>
  );
}

export default Header;
