import Answer from "../../Features/Answer/Answer";
import Header from "../../Widgets/Header/Header";
import style from "./Admisssion.module.scss";
import { checkPasswordMiddleware } from "../../Shared/Utils/MiddleWare";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Admission() {
  const navigate = useNavigate();
  // 미들웨어로 경로 확인
  useEffect(() => {
    checkPasswordMiddleware("0127", navigate);
  }, []);

  return (
    <div className={style.admission}>
      <Header backBtn={false} />
      <p className={style.admissionHint}>*힌트:콘솔</p>

      <div className={style.admissionContainer}>
        <div className={style.admissionBox}>
          <h4>입장 비밀번호</h4>
          <Answer words={"0127"} navigation="rooms" entryBtnName="입장하기" />
        </div>
        <p className={style.admissionDescription}>
          *본 게임은 개발자를 위한 방탈출 게임입니다.
          <br />
          모든 방에서 힌트를 찾아 탈출하시면 됩니다!
          <br />
          힌트는 본 웹사이트 안에만 존재하는것 외에 외부 어디에서든 존재합니다.
          <br />
          <span>모든 답변은 숫자 또는 영문 소문자 입니다.!!!!</span>
        </p>
      </div>
    </div>
  );
}

export default Admission;
