import Answer from "../../Features/Answer/Answer";
import Header from "../../Widgets/Header/Header";
import style from "./Admisssion.module.scss";

function Admission() {
  console.log("헬로");
  return (
    <div className={style.admission}>
      <Header backBtn={false} />
      <p className={style.admissionHint}>*힌트:콘솔</p>

      <div className={style.admissionContainer}>
        <div className={style.admissionBox}>
          <h4>입장 비밀번호</h4>
          <Answer words={"0127"} />
        </div>
        <p className={style.admissionDescription}>
          *본 게임은 개발자를 위한 방탈출 게임입니다.
          <br />
          모든 방에서 힌트를 찾아 탈출하시면 됩니다!
          <br />
          힌트는 본 웹사이트 안에만 존재하는것 외에 외부 어디에서든 존재합니다.
        </p>
      </div>
    </div>
  );
}

export default Admission;
