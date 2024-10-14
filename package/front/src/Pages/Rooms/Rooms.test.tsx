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

// window.alert를 Mock으로 설정
beforeAll(() => {
  jest.spyOn(window, "alert").mockImplementation(() => {});
});

describe("Rooms Component Test", () => {
  // 초기화
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  const renderRooms = () => {
    return render(
      <MemoryRouter>
        <Rooms />
      </MemoryRouter>
    );
  };

  const user = userEvent.setup();

  test("해결된 방은 입장 button이 표시되어야 한다", () => {
    // localStorage에 correctAnswers 저장
    localStorage.setItem(
      "correctAnswers",
      JSON.stringify(["0127", "virtualdom"])
    );

    renderRooms();

    const entryButton = screen.getByRole("button", { name: /2번방 입장하기/i });
    expect(entryButton).toBeInTheDocument();
  });

  test("해결되지 않은 방은 Answer 컴포넌트가 표시되어야 한다", async () => {
    // localStorage에 correctAnswers 저장하지 않음
    localStorage.setItem("correctAnswers", JSON.stringify([]));

    renderRooms();

    const submitButton = screen.getByRole("button", {
      name: /2번방 입장하기/i,
    });
    await user.click(submitButton);

    const errorMessage = await screen.findByText(
      "*비밀번호가 일치하지 않습니다."
    );
    expect(errorMessage).toBeInTheDocument();
  });

  test("방 버튼 클릭 시 경로 이동 테스트", async () => {
    // localStorage에 correctAnswers 저장 (올바른 값)
    localStorage.setItem(
      "correctAnswers",
      JSON.stringify(["0127", "virtualdom"])
    );

    renderRooms();

    const entryButton = screen.getByRole("button", { name: /2번방 입장하기/i });
    await user.click(entryButton);

    expect(mockNavigate).toHaveBeenCalledWith("/room2");
  });

  test("localStorage에 correctAnswers를 비워서 잘못된 접근 테스트", () => {
    localStorage.setItem("correctAnswers", JSON.stringify([]));

    renderRooms();

    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });
});
