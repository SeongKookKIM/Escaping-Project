import style from "./Room.module.scss";
import Header from "../../Widgets/Header/Header";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

function Room() {
  const roomNumber = useParams();

  useEffect(() => {
    console.log(roomNumber.id);
  }, []);

  return (
    <div className={style.room}>
      <Header backBtn={true} />
    </div>
  );
}

export default Room;
