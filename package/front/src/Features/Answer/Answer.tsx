import { useRef, useState } from "react";
import { wordsType } from "../../Entries/Answer/AnswerModel";
import style from "./Answer.module.scss";
import { useNavigate } from "react-router-dom";

function Answer({ words, navigation }: wordsType) {
  const [values, setValues] = useState<string[]>(Array(words.length).fill(""));
  const [errorMessage, setErrorMessage] = useState<string>("");
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const navigate = useNavigate();

  // Input Change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newValues = [...values];
    newValues[index] = e.target.value;
    setValues(newValues);

    // 글자 입력시 다음 input으로 이동
    if (e.target.value && inputsRef.current[index + 1]) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  // Input 생성
  const renderInputs = () => {
    const inputWidth = `${100 / words.length}%`;

    return words.split("").map((_, index) => (
      <input
        key={index}
        type="text"
        maxLength={1}
        value={values[index]}
        ref={(el) => (inputsRef.current[index] = el)}
        onChange={(e) => handleChange(e, index)}
        style={{
          width: inputWidth,
        }}
        className={style.answerInput}
      />
    ));
  };

  // SubmitBtn Handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (values.join("") === words) {
      navigate(`/${navigation}`);
    } else {
      setErrorMessage("*비밀번호가 일치하지 않습니다.");
      setValues(Array(words.length).fill(""));
      inputsRef.current[0]?.focus();
    }
  };

  return (
    <form onSubmit={handleSubmit} className={style.answer}>
      <div className={style.answerInputBox}>{renderInputs()}</div>
      {errorMessage && (
        <span className={style.answerErrorMessage}>{errorMessage}</span>
      )}
      <button type="submit" className={style.answerSubmitBtn}>
        입장하기
      </button>
    </form>
  );
}

export default Answer;
