export type roomType = {
  id: string;
  content: string;
  hint: string;
};

export const roomInfo: roomType[] = [
  {
    id: "room1",
    content: "Drag",
    hint: "<html><head>Room1 문제</head></html>",
  },
  {
    id: "room2",
    content: "https://github.com/SeongKookKIM/Escaping-Project",
    hint: "ReadMe(8,2)",
  },
  {
    id: "room3",
    content:
      "당신은 리액트로 쇼핑몰 웹사이트를 개발하는 팀의 일원입니다. 팀은 웹사이트의 성능을 최적화하기 위해 몇 가지 기능을 개선하려고 합니다. 특히, 사용자가 제품을 장바구니에 추가할 때마다 호출되는 함수를 최적화하고자 합니다. 현재, 사용자가 제품을 추가할 때마다 호출되는 함수가 매번 재생성되어 불필요한 렌더링이 발생하고 있습니다.팀의 목표는 동일한 함수가 재생성되지 않도록 하여 성능을 최적화하는 것입니다.",
    hint: "memoization",
  },
  {
    id: "room4",
    content: "Show",
    hint: "front/src/.txt",
  },
  {
    id: "room5",
    content: "Cookie",
    hint: "Encoding -> Decoding",
  },
  {
    id: "room6",
    content:
      "당신은 전자 상거래 웹사이트를 개발하고 있습니다. 이 웹사이트는 상품 목록 조회, 상품 상세 정보 조회, 장바구니 추가, 주문 생성 등의 기능을 제공합니다. 이러한 기능들을 구현하기 위해 서버와 클라이언트 간에 데이터 교환이 필요합니다. 서버는 HTTP 프로토콜을 사용하여 클라이언트의 요청을 받고, 요청에 대한 적절한 응답을 JSON 형식으로 반환합니다. 또한, 서버는 URL 경로와 HTTP 메서드(GET, POST, PUT, DELETE 등)를 활용하여 다양한 자원에 접근하고 조작할 수 있도록 설계되었습니다. 이와 같은 아키텍처 스타일을 무엇이라고 하나요? ",
    hint: "Fake(Go to Home)",
  },
];
