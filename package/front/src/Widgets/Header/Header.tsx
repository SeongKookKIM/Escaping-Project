import style from "./Header.module.scss";
import { HeaderProps } from "../../Entries/HeaderNavigation/HeaderModel";
import { useNavigate } from "react-router-dom";

function Header({ backBtn }: HeaderProps) {
  const navigate = useNavigate();

  return (
    <div className={style.header}>
      {backBtn && (
        <button
          type="button"
          className={style.backBtn}
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>
      )}
      <h3>@Escaping</h3>
    </div>
  );
}

export default Header;
