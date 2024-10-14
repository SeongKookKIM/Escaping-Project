import style from "./Room.module.scss";
import Header from "../../Widgets/Header/Header";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { roomModel, roomType } from "../../Entries/Room/RoomModel";
import { saveCookie } from "../../Shared/Utils/CookieHelper";
import { checkPasswordMiddleware } from "../../Shared/Utils/MiddleWare";
import { loadData } from "../../Shared/Utils/LocalStorageHelpers";

function Room() {
  const { id: roomId } = useParams();
  const [roomData, setRoomData] = useState<roomType | undefined>();
  const [roomThreeShow, setRoomThreeShow] = useState<boolean>(false);
  const [roomFourShow, setRoomFourShow] = useState<boolean>(false);
  const [roomSixShow, setRoomSixShow] = useState<boolean>(false);

  const naviage = useNavigate();

  useEffect(() => {
    const findRoom = roomModel.find((room) => room.id === roomId);
    setRoomData(findRoom);

    const saved: string[] = loadData("correctAnswers") || [];

    // Room1 경로 체크
    if (roomId === "room1") {
      if (!saved.includes("0127")) {
        alert("올바른 경로가 아닙니다.");
        naviage(-1);
      }
    }
    // Room1 제외한 다른 경로들
    if (findRoom?.answer) {
      checkPasswordMiddleware(findRoom?.answer, naviage);
    }

    // Room5 질문 생성
    if (roomId === "room5") {
      saveCookie(
        "Room5_question",
        "당신은 웹 애플리케이션을 개발하고 있습니다. 사용자가 버튼을 클릭하면 서버에서 데이터를 받아와 화면에 표시해야 합니다. 이 데이터 요청은 시간이 걸릴 수 있기 때문에, 데이터를 받아오는 동안 사용자 인터페이스가 멈추지 않고 다른 작업을 계속할 수 있어야 합니다. 이러한 상황에서 서버로부터 데이터를 받아오는 작업을 비동기적으로 처리하면서, 작업이 완료될 때까지 기다린 후 결과를 처리하고 싶습니다. 이를 위해 사용할 수 있는 JavaScript의 문법은 무엇입니까?",
        10
      );
      saveCookie(
        "Room5_hint",
        "기존의 비동기 처리 방식인 콜백 함수와 프로미스의 단점을 보완하고 코드 가독성을 좋게 만들어주는 비동기 처리 패턴입니다.",
        10
      );
    }
  }, [roomId]);

  // Room Switch를 사용하여 분기 처리
  switch (roomData?.id) {
    case "room1":
      return (
        <div className={style.room}>
          <Header backBtn={true} />
          <h4>{roomData.id}</h4>
          <div className={style.roomContentBox}>
            <p className={style.roomOneContentText}>{roomData?.content}</p>
          </div>
          <span className={`${style.roomHint} ${style.roomOneHint}`}>
            Hint: {roomData?.hint}
          </span>
        </div>
      );
    case "room2":
      return (
        <div className={style.room}>
          <Header backBtn={true} />
          <h4>{roomData.id}</h4>
          <div className={style.roomContentBox}>
            <a
              href="https://github.com/SeongKookKIM/Escaping-Project"
              target="_blank"
              className={style.roomTwoContentText}
            >
              {roomData?.content}
            </a>
          </div>
          <span className={`${style.roomHint} ${style.roomTwoHint}`}>
            Hint: {roomData?.hint}
          </span>
        </div>
      );
    case "room3":
      return (
        <div className={style.room}>
          <Header backBtn={true} />
          <h4>{roomData.id}</h4>
          <div className={style.roomContentBox}>
            {roomThreeShow && (
              <p className={style.roomThreeContentText}>{roomData?.content}</p>
            )}
          </div>
          <span
            className={`${style.roomHint} ${style.roomThreeHint}`}
            onClick={() => setRoomThreeShow(!roomThreeShow)}
          >
            Hint: {roomData?.hint}
          </span>
        </div>
      );
    case "room4":
      return (
        <div className={style.room}>
          <Header backBtn={true} />
          <h4>{roomData.id}</h4>
          <div className={style.roomContentBox}>
            <p
              className={style.roomFourContentText}
              onClick={() => setRoomFourShow(!roomFourShow)}
            >
              {roomData?.content}
            </p>
          </div>
          {roomFourShow && (
            <span className={`${style.roomHint} ${style.roomFourHint}`}>
              Hint: {roomData?.hint}
            </span>
          )}
        </div>
      );
    case "room5":
      return (
        <div className={style.room}>
          <Header backBtn={true} />
          <h4>{roomData.id}</h4>
          <div className={style.roomContentBox}>
            <p className={style.roomFiveContentText}>{roomData?.content}</p>
          </div>
          <span className={`${style.roomHint} ${style.roomFiveHint}`}>
            Hint: {roomData?.hint}
          </span>
        </div>
      );
    case "room6":
      return (
        <div className={style.room}>
          <Header backBtn={true} />
          <h4
            className={style.roomSixTitle}
            onClick={() => setRoomSixShow(!roomSixShow)}
          >
            {roomData.id}
          </h4>
          <div className={style.roomContentBox}>
            <p className={style.roomSixContentText}>{roomData?.content}</p>
          </div>
          <span
            className={`${style.roomHint} ${
              roomSixShow ? style.roomSixHintVisible : style.roomSixHintHidden
            }`}
          >
            Hint: {roomData?.hint}
          </span>
        </div>
      );
    default:
      break;
  }

  return (
    <div className={style.room}>
      <Header backBtn={true} />
      <div className={style.roomContentBox}>
        <p className={style.roomDefaultText}>올바른 경로가 아닙니다.</p>
      </div>
    </div>
  );
}

export default Room;
