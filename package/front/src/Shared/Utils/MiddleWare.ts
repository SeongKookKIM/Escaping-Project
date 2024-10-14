// middlewareCheckPassword.ts
import { loadData } from "./LocalStorageHelpers";
import { NavigateFunction } from "react-router-dom";

export const checkPasswordMiddleware = (
  navigation: string | undefined,
  navigate: NavigateFunction
) => {
  const checkPassword = loadData("correctAnswers") || [];

  switch (navigation) {
    case "0127":
      if (checkPassword.includes("0127")) {
        alert("올바른 경로가 아닙니다.");
        navigate(-1);
      } else {
        console.log(
          "입장 비밀번호는 '0127' 입니다. 앞으로의 방탈출 게임에서는 개발자 도구나 요소를 클릭하거나 드래그하여 힌트를 찾을 수 있습니다. 브라우저의 모든 요소와 검색을 통해 자유롭게 살펴보며 방탈출 게임을 진행해 주세요!"
        );
      }
      break;

    default:
      if (!checkPassword.includes(navigation)) {
        alert("올바른 경로가 아닙니다.");
        navigate(-1);
      }
      break;
  }
};
