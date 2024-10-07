import { useRef, useState } from "react";
import { wordsType } from "../../Entries/Answer/AnswerModel";
import style from "./Answer.module.scss";

function Answer({ words }: wordsType) {
  // 각 문자에 대해 개별 input을 위해 배열로 초기화합니다.
  const [values, setValues] = useState<string[]>(Array(words.length).fill(""));
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const submitButtonRef = useRef<HTMLButtonElement | null>(null);

  // input change handler
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newValues = [...values];
    newValues[index] = e.target.value;
    setValues(newValues);

    // 한 글자 입력 시 다음 input으로 이동
    if (e.target.value && inputsRef.current[index + 1]) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  // input field rendering
  const renderInputs = () => {
    return words.split("").map((_, index) => (
      <input
        key={index}
        type="text"
        maxLength={1}
        value={values[index]}
        ref={(el) => (inputsRef.current[index] = el)}
        onChange={(e) => handleChange(e, index)}
        style={{
          width: "50px",
          height: "50px",
          textAlign: "center",
          margin: "5px",
          fontSize: "20px",
        }}
      />
    ));
  };

  // submit handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("All characters are filled and form submitted!");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ display: "flex", flexWrap: "wrap" }}>{renderInputs()}</div>
      <button ref={submitButtonRef} type="submit" style={{ marginTop: "20px" }}>
        Submit
      </button>
    </form>
  );
}

export default Answer;
