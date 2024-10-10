import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import Home from "./Home";

// useNavigate를 Mock으로 설정
const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("Home Component Test", () => {
  // Home 렌더링
  const renderHome = () => {
    return render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
  };

  test("correctAnswers에 0127이 포함되어 있으면 rooms 페이지로 이동", async () => {
    const user = userEvent.setup();

    // localStorage에 correctAnswers 저장
    localStorage.setItem("correctAnswers", JSON.stringify(["0127"]));

    renderHome();

    const startBtn = screen.getByRole("button", { name: /시작하기/i });

    await user.click(startBtn);

    expect(mockNavigate).toHaveBeenCalledWith("/rooms");
  });

  test("correctAnswers에 0127이 포함되어 있지 않으면 admission 페이지로 이동", async () => {
    const user = userEvent.setup();

    // localStorage에서 correctAnswers 제거
    localStorage.removeItem("correctAnswers");

    renderHome();

    const startBtn = screen.getByRole("button", { name: /시작하기/i });

    await user.click(startBtn);

    expect(mockNavigate).toHaveBeenCalledWith("/admission");
  });
});
