import Header from "../../Widgets/Header/Header";
import style from "./Escape.module.scss";

function Escape() {
  // 공유하기 버튼
  const handlerShare = () => {
    const shareUrl = "http://localhost:5173/";
    if (navigator.share) {
      navigator
        .share({
          title: "방 탈출 게임에 도전하세요!",
          text: "저는 방 탈출에 성공했습니다! 당신도 도전해 보세요! 😎💡",
          url: shareUrl,
        })
        .then(() => console.log("공유 성공"))
        .catch((error) => {
          console.log("공유 실패", error);
          shareClipboard(shareUrl);
        });
    } else {
      shareClipboard(shareUrl);
    }
  };

  // Web Share API를 지원하지 않는 경우 또는 실패할 경우
  const shareClipboard = (shareUrl: string) => {
    navigator.clipboard
      .writeText(shareUrl)
      .then(() => alert("링크가 복사되었습니다! 지인과 공유해보세요."))
      .catch((error) =>
        alert(
          `${error}: 링크 복사에 실패했습니다. 다른 방법으로 공유해 주세요.`
        )
      );
  };

  return (
    <div className={style.escape}>
      <Header backBtn={false} retryBtn={true} />
      <div className={style.escapeContainer}>
        <p>
          축하합니다! 방 탈출에 성공하셨습니다! 😎💡
          <br />
          게임이 재미있으셨다면 지인이나 동료와 공유해 도전해보게 해주세요!
          <br />
        </p>
        <button type="button" className={style.shareBtn} onClick={handlerShare}>
          공유하기
        </button>
      </div>
    </div>
  );
}

export default Escape;
