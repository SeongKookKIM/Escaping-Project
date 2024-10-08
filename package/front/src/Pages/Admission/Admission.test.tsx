import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import Answer from "../../Features/Answer/Answer";

// useNavigate를 Mock으로 설정
const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("Admission Components Test", () => {
  const user = userEvent.setup();

  // Answer 렌더링
  const renderAnswer = () => {
    return render(
      <MemoryRouter>
        <Answer words="0127" navigation="room" />
      </MemoryRouter>
    );
  };

  test("입장 비밀번호 틀렸을 경우 테스트", async () => {
    renderAnswer();

    const inputs = screen.getAllByRole("textbox");
    const submitButton = screen.getByRole("button", { name: "입장하기" });

    // 틀린 비밀번호 입력
    await user.type(inputs[0], "0");
    await user.type(inputs[1], "1");
    await user.type(inputs[2], "2");
    await user.type(inputs[3], "8");

    await user.click(submitButton);

    // 에러 메시지
    expect(
      screen.getByText("*비밀번호가 일치하지 않습니다.")
    ).toBeInTheDocument();
  });

  test("입장 비밀번호가 맞을 경우 room으로 페이지 전환 테스트", async () => {
    renderAnswer();

    const inputs = screen.getAllByRole("textbox");
    const submitButton = screen.getByRole("button", { name: "입장하기" });

    // 올바른 비밀번호 입력
    await user.type(inputs[0], "0");
    await user.type(inputs[1], "1");
    await user.type(inputs[2], "2");
    await user.type(inputs[3], "7");

    await user.click(submitButton);

    expect(mockNavigate).toHaveBeenCalledWith("/room");
  });
});
