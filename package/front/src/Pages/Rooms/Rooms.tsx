import { useEffect, useState } from "react";
import Header from "../../Widgets/Header/Header";
import style from "./Rooms.module.scss";
import { wordsType } from "../../Entries/Answer/AnswerModel";
import { roomsModel } from "../../Entries/Room/RoomModel";
import Answer from "../../Features/Answer/Answer";
import { useNavigate } from "react-router-dom";

import room1 from "../../assets/room1-bg.png";
import room2 from "../../assets/room2-bg.png";
import room3 from "../../assets/room3-bg.png";
import room4 from "../../assets/room4-bg.png";
import room5 from "../../assets/room5-bg.png";
import room6 from "../../assets/room6-bg.png";
import room7 from "../../assets/room7-bg.png";
import { loadData } from "../../Shared/Utils/LocalStorageHelpers";

function Rooms() {
  const [rooms, setRooms] = useState<wordsType[]>([]);
  const [savedAnswers, setSavedAnswers] = useState<string[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    setRooms(roomsModel);

    const saved: string[] = loadData("correctAnswers") || [];
    setSavedAnswers(saved);
  }, []);

  return (
    <div className={style.rooms}>
      <Header backBtn={false} />
      <div className={style.roomsContainer}>
        {rooms.map((room: wordsType, idx: number) => {
          const roomImages = [room1, room2, room3, room4, room5, room6, room7];
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
