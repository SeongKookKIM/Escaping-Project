import { useEffect, useState } from "react";
import Header from "../../Widgets/Header/Header";
import style from "./Rooms.module.scss";
import { wordsType } from "../../Entries/Answer/AnswerModel";
import { roomsModel } from "../../Entries/Room/RoomModel";
import Answer from "../../Features/Answer/Answer";

function Rooms() {
  const [rooms, setRooms] = useState<wordsType[]>([]);

  useEffect(() => {
    setRooms(roomsModel);
  }, []);

  return (
    <div className={style.rooms}>
      <Header backBtn={false} />
      <div className={style.roomsContainer}>
        {rooms.map((room: wordsType, idx: number) => {
          const colors = [
            "#5c4033", // Dark brown
            "#4e3629", // Deep coffee
            "#3d2b1f", // Very dark brown
            "#6f4e37", // Coffee
            "#704214", // Saddle brown
            "#2e1a0f", // Very dark chocolate
            "#3b2f2f", // Dark taupe
          ];

          return (
            <div
              key={idx}
              className={style.roomBox}
              style={{ backgroundColor: colors[idx] }}
            >
              <Answer
                words={room.words}
                navigation={room.navigation}
                entryBtnName={room.entryBtnName}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Rooms;
