import style from "./Room.module.scss";
import Header from "../../Widgets/Header/Header";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { roomInfo, roomType } from "../../Entries/Room/RoomModel";
import { saveCookie } from "../../Shared/Utils/CookieHelper";

function Room() {
  const { id: roomId } = useParams();
  const [roomData, setRoomData] = useState<roomType | undefined>();

  const [roomThreeShow, setRoomThreeShow] = useState<boolean>(false);
  const [roomFourShow, setRoomFourShow] = useState<boolean>(false);
  const [roomSixShow, setRoomSixShow] = useState<boolean>(false);
  console.log(roomSixShow);

  useEffect(() => {
    const findRoom = roomInfo.find((room) => room.id === roomId);
    setRoomData(findRoom);

    if (roomId === "room5") {
      saveCookie("Room5_question", findRoom?.content ?? "", 10);
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
      <p>비어있습니다.</p>
    </div>
  );
}

export default Room;
