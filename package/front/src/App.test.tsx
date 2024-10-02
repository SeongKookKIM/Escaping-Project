import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

describe("Login Test", () => {
  test("처음에 Login버튼이 있다.", () => {
    render(<App />);
    const btnEl = screen.getByRole("button");
    expect(btnEl).toHaveTextContent("Login");
  });

  const user = userEvent.setup();
  test("클릭시 Logout이 된다.", async () => {
    render(<App />);
    const btnEl = screen.getByRole("button");
    await user.click(btnEl); //promise를 반환
    expect(btnEl).toHaveTextContent("Logout");
  });

  test("tab, space, enter 키보드 동작", async () => {
    render(<App />);
    const btnEl = screen.getByRole("button");
    await user.tab(); //promise를 반환
    await user.keyboard(" "); //promise를 반환
    await user.keyboard(" "); //promise를 반환
    await user.keyboard("{Enter}"); //promise를 반환
    expect(btnEl).toHaveTextContent("Logout");
  });
});
