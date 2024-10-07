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

describe("Home Component", () => {
  test("시작하기 버튼 클릭 시 admission페이지 이동 테스트", async () => {
    const user = userEvent.setup();

    // Home 컴포넌트 렌더링
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    // 시작하기 버튼 찾기
    const startBtn = screen.getByRole("button", { name: /시작하기/i });

    // 버튼 클릭 이벤트 발생
    await user.click(startBtn);

    // navigate가 "/admission"으로 호출되는지 확인
    expect(mockNavigate).toHaveBeenCalledWith("/admission");
  });
});
