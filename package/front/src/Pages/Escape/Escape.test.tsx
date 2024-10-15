import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import Escape from "./Escape";

let mockShare: jest.Mock;
let mockWriteText: jest.Mock;

beforeEach(() => {
  mockShare = jest.fn(() => Promise.resolve());
  mockWriteText = jest.fn(() => Promise.resolve());

  Object.defineProperty(navigator, "share", {
    value: mockShare,
    configurable: true,
    writable: true,
  });

  Object.defineProperty(navigator.clipboard, "writeText", {
    value: mockWriteText,
    configurable: true,
    writable: true,
  });

  window.alert = jest.fn();
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe("Escape Component Test", () => {
  const renderEscape = () => {
    return render(
      <MemoryRouter>
        <Escape />
      </MemoryRouter>
    );
  };

  const user = userEvent.setup();

  test("공유하기 버튼 클릭 시 Web Share API 호출", async () => {
    renderEscape();

    const shareButton = screen.getByText("공유하기");
    await user.click(shareButton);

    await waitFor(() => {
      expect(mockShare).toHaveBeenCalled();
    });
  });

  test("Web Share API를 지원하지 않을 경우 클립보드에 복사", async () => {
    Object.defineProperty(navigator, "share", {
      value: undefined,
      configurable: true,
      writable: true,
    });

    renderEscape();

    const shareButton = screen.getByText("공유하기");
    await user.click(shareButton);

    await waitFor(() => {
      expect(mockWriteText).toHaveBeenCalledWith(
        "https://escaping-project-front.vercel.app/"
      );
      expect(window.alert).toHaveBeenCalledWith(
        "링크가 복사되었습니다! 지인과 공유해보세요."
      );
    });
  });
});
