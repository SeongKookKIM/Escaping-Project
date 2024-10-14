import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Room from "./Room";

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

describe("Room Component Test", () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  const user = userEvent.setup();

  const renderRoom = (roomId: string) => {
    return render(
      <MemoryRouter initialEntries={[`/room/${roomId}`]}>
        <Routes>
          <Route path="/room/:id" element={<Room />} />
        </Routes>
      </MemoryRouter>
    );
  };

  test("올바른 경로가 아닌 경우 뒤로가기 동작 테스트", () => {
    localStorage.setItem("correctAnswers", JSON.stringify([]));

    renderRoom("room1");

    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });

  // Room1 Test
  test("Room 1에서 올바른 경로인 경우 Room 1 내용을 렌더링해야 한다", () => {
    localStorage.setItem("correctAnswers", JSON.stringify(["0127"]));

    renderRoom("room1");

    expect(screen.getByRole("heading", { name: /room1/i })).toBeInTheDocument();
    expect(screen.getByText("Drag")).toBeInTheDocument();
  });

  // Room2 Test
  test("Room 2에서 링크가 올바르게 렌더링되어야 한다", () => {
    localStorage.setItem(
      "correctAnswers",
      JSON.stringify(["0127", "virtualdom"])
    );

    renderRoom("room2");

    const linkElement = screen.getByRole("link", {
      name: /https:\/\/github\.com\/SeongKookKIM\/Escaping-Project/i,
    });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute(
      "href",
      "https://github.com/SeongKookKIM/Escaping-Project"
    );
  });

  // Room3 Test
  test("Room 3에서 힌트 클릭 시 내용이 표시되어야 한다", async () => {
    localStorage.setItem("correctAnswers", JSON.stringify(["0127", "csr"]));

    renderRoom("room3");

    const hintButton = screen.getByText(/hint/i);
    await user.click(hintButton);

    expect(
      screen.getByText(
        "당신은 리액트로 쇼핑몰 웹사이트를 개발하는 팀의 일원입니다. 팀은 웹사이트의 성능을 최적화하기 위해 몇 가지 기능을 개선하려고 합니다. 특히, 사용자가 제품을 장바구니에 추가할 때마다 호출되는 함수를 최적화하고자 합니다. 현재, 사용자가 제품을 추가할 때마다 호출되는 함수가 매번 재생성되어 불필요한 렌더링이 발생하고 있습니다.팀의 목표는 동일한 함수가 재생성되지 않도록 하여 성능을 최적화하는 것입니다."
      )
    ).toBeInTheDocument();
  });

  // Room4 Test
  test("Room 4에서 힌트 클릭 시 내용이 토글되어야 한다", async () => {
    localStorage.setItem(
      "correctAnswers",
      JSON.stringify(["0127", "usecallback"])
    );

    renderRoom("room4");

    // Room 4의 힌트 버튼 클릭 전 내용이 보이지 않아야 함
    expect(
      screen.queryByText(
        (content, element) =>
          element?.tagName.toLowerCase() === "span" &&
          content.includes("package/front/src/.txt")
      )
    ).not.toBeInTheDocument();

    const contentElement = screen.getByText(/Show/i);
    await user.click(contentElement);

    expect(
      screen.getByText(
        (content, element) =>
          element?.tagName.toLowerCase() === "span" &&
          content.includes("package/front/src/.txt")
      )
    ).toBeInTheDocument();

    await user.click(contentElement);

    expect(
      screen.queryByText(
        (content, element) =>
          element?.tagName.toLowerCase() === "span" &&
          content.includes("package/front/src/.txt")
      )
    ).not.toBeInTheDocument();
  });

  // Room5 Test
  test("Room 5에서 쿠키 설정이 올바르게 작동해야 한다", () => {
    localStorage.setItem(
      "correctAnswers",
      JSON.stringify(["0127", "hoisting"])
    );

    // 쿠키 저장에 대한 모의 데이터
    document.cookie =
      "Room5_question=당신은 웹 애플리케이션을 개발하고 있습니다. 사용자가 버튼을 클릭하면 서버에서 데이터를 받아와 화면에 표시해야 합니다. 이 데이터 요청은 시간이 걸릴 수 있기 때문에, 데이터를 받아오는 동안 사용자 인터페이스가 멈추지 않고 다른 작업을 계속할 수 있어야 합니다. 이러한 상황에서 서버로부터 데이터를 받아오는 작업을 비동기적으로 처리하면서, 작업이 완료될 때까지 기다린 후 결과를 처리하고 싶습니다. 이를 위해 사용할 수 있는 JavaScript의 문법은 무엇입니까?";
    document.cookie =
      "Room5_hint=기존의 비동기 처리 방식인 콜백 함수와 프로미스의 단점을 보완하고 코드 가독성을 좋게 만들어주는 비동기 처리 패턴입니다.";

    renderRoom("room5");

    // 쿠키가 저장되었는지 확인하는 코드
    expect(
      document.cookie.includes(
        "Room5_question=당신은 웹 애플리케이션을 개발하고 있습니다. 사용자가 버튼을 클릭하면 서버에서 데이터를 받아와 화면에 표시해야 합니다. 이 데이터 요청은 시간이 걸릴 수 있기 때문에, 데이터를 받아오는 동안 사용자 인터페이스가 멈추지 않고 다른 작업을 계속할 수 있어야 합니다. 이러한 상황에서 서버로부터 데이터를 받아오는 작업을 비동기적으로 처리하면서, 작업이 완료될 때까지 기다린 후 결과를 처리하고 싶습니다. 이를 위해 사용할 수 있는 JavaScript의 문법은 무엇입니까?"
      )
    ).toBe(true);
    expect(
      document.cookie.includes(
        "Room5_hint=기존의 비동기 처리 방식인 콜백 함수와 프로미스의 단점을 보완하고 코드 가독성을 좋게 만들어주는 비동기 처리 패턴입니다."
      )
    ).toBe(true);
  });

  // Room6
  test("Room 6에서 제목 클릭 시 힌트가 표시되어야 한다", async () => {
    localStorage.setItem(
      "correctAnswers",
      JSON.stringify(["0127", "asyncawait"])
    );

    renderRoom("room6");

    const roomTitle = screen.getByRole("heading", { name: /room6/i });
    await user.click(roomTitle);

    expect(
      screen.getByText((content, element) => {
        return (
          element?.tagName.toLowerCase() === "span" &&
          content.includes("Hint:") &&
          content.includes("Fake(Go to Home)")
        );
      })
    ).toBeInTheDocument();
  });
});
