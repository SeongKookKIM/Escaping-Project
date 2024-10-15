import { useEffect, useState } from "react";
import Header from "../../Widgets/Header/Header";
import style from "./Rooms.module.scss";
import { wordsType } from "../../Entries/Answer/AnswerModel";
import { roomsModel } from "../../Entries/Rooms/RoomsModel";
import Answer from "../../Features/Answer/Answer";
import { useNavigate } from "react-router-dom";

import { loadData } from "../../Shared/Utils/LocalStorageHelpers";
import { deleteCookie } from "../../Shared/Utils/CookieHelper";

function Rooms() {
  const [rooms, setRooms] = useState<wordsType[]>([]);
  const [savedAnswers, setSavedAnswers] = useState<string[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    setRooms(roomsModel);

    const saved: string[] = loadData("correctAnswers") || [];

    // 네비게이션 확인
    if (saved.includes("0127")) {
      setSavedAnswers(saved);
    } else {
      alert("올바른 경로가 아닙니다.");
      navigate(-1);
    }

    deleteCookie("Room5_question");
    deleteCookie("Room5_hint");
  }, []);

  return (
    <div className={style.rooms}>
      <Header backBtn={false} homeBtn={true} />
      <div className={style.roomsContainer}>
        {rooms.map((room: wordsType, idx: number) => {
          const roomImages: string[] = [
            "https://samescaping.s3.ap-northeast-2.amazonaws.com/room1-bg.png",
            "https://samescaping.s3.ap-northeast-2.amazonaws.com/room2-bg.png",
            "https://samescaping.s3.ap-northeast-2.amazonaws.com/room3-bg.png",
            "https://samescaping.s3.ap-northeast-2.amazonaws.com/room4-bg.png",
            "https://samescaping.s3.ap-northeast-2.amazonaws.com/room5-bg.png",
            "https://samescaping.s3.ap-northeast-2.amazonaws.com/room6-bg.png",
            "https://samescaping.s3.ap-northeast-2.amazonaws.com/room7-bg.png",
          ];
          const isSolved = savedAnswers.includes(room.words);

          return (
            <div
              key={idx}
              className={style.roomBox}
              style={{
                background:
                  idx === 0
                    ? `url(${roomImages[idx]})`
                    : isSolved
                    ? `url(${roomImages[idx]})`
                    : `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${roomImages[idx]})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {isSolved ? (
                <button
                  type="button"
                  className={style.answerSubmitBtn}
                  onClick={() => navigate(`/${room.navigation}`)}
                >
                  {room.entryBtnName}
                </button>
              ) : (
                <Answer
                  words={room.words}
                  navigation={room.navigation}
                  entryBtnName={room.entryBtnName}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Rooms;
