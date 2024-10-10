import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import Rooms from "./Rooms";

// useNavigate를 Mock으로 설정
const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("Rooms Component Test", () => {
  // Rooms 렌더링
  const renderRooms = () => {
    return render(
      <MemoryRouter>
        <Rooms />
      </MemoryRouter>
    );
  };

  const user = userEvent.setup();

  test("해결된 방은 entry button이 표시되어야 한다", () => {
    // localStorage에 correctAnswers 저장
    localStorage.setItem("correctAnswers", JSON.stringify(["context"]));

    renderRooms();

    const entryButton = screen.getByRole("button", { name: /2번방 입장하기/i });
    expect(entryButton).toBeInTheDocument();
  });

  test("해결되지 않은 방은 Answer 컴포넌트가 표시되어야 한다", async () => {
    // localStorage에서 correctAnswers 제거
    localStorage.removeItem("correctAnswers");

    renderRooms();

    const entryButton = screen.getByRole("button", { name: /2번방 입장하기/i });
    await user.click(entryButton);

    expect(
      screen.getByText("*비밀번호가 일치하지 않습니다.")
    ).toBeInTheDocument();
  });

  test("방 버튼 클릭 시 경로 이동 테스트", async () => {
    // localStorage에 correctAnswers 저장
    localStorage.setItem("correctAnswers", JSON.stringify(["context"]));

    renderRooms();

    const entryButton = screen.getByRole("button", { name: /2번방 입장하기/i });
    await user.click(entryButton);

    expect(mockNavigate).toHaveBeenCalledWith("/room2");
  });
});
