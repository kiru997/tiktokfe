import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AppContext from "../../context/GlobalContext";
import ListComment from "./listcomment.jsx";
import { getCurrentRegion } from "../../actions/region";
import { setCookie } from "../../actions/cookie";
const VideodetailComponent = props => {
  const context = useContext(AppContext);
  const videoUid = props.match.params.videoUid;
  const { region, listVideo, actFetchListVideo } = context;
  const [currentVideo, setCurrentVideo] = useState({});
  const [previousVideoUid, setPreviousVideoUid] = useState("");
  const [nextVideoUid, setNextVideoUid] = useState("");
  useEffect(() => {
    let indexVideo = listVideo.findIndex(item => {
      return item.aweme_id === videoUid;
    });
    indexVideo !== -1
      ? listVideo[indexVideo]
        ? setCurrentVideo(listVideo[indexVideo])
        : setCurrentVideo({})
      : setCurrentVideo({});
    let pre = listVideo[indexVideo - 1];
    let next = listVideo[indexVideo + 1];
    pre && pre.aweme_id
      ? setPreviousVideoUid(pre.aweme_id)
      : setPreviousVideoUid("");
    if (indexVideo + 3 >= listVideo.length) {
      actFetchListVideo(getCurrentRegion().code, true);
    }
    next && next.aweme_id
      ? setNextVideoUid(next.aweme_id)
      : setNextVideoUid("");
  }, [videoUid, listVideo]);
  let videoElement;
  const [isMute, setIsMute] = useState(false);
  const [isPlay, setIsPlay] = useState(true);
  const onChangeSound = () => {
    setIsMute(!isMute);
  };
  const onChangePlay = () => {
    setIsPlay(!isPlay);
    isPlay ? videoElement.pause() : videoElement.play();
  };
  const onCloseDetail = () => {
    setCookie("isCloseDetail", true, 10, false);
    setIsPlay(true);
  };

  return (
    Object.keys(currentVideo).length !== 0 && (
      <div className="video-detail-container">
        {previousVideoUid && (
          <Link to={`/${region}/videos/${previousVideoUid}`}>
            <img
              className="back-icon arrow-icon"
              src={require("../../assets/images/back.svg")}
            />
          </Link>
        )}
        {nextVideoUid && (
          <Link to={`/${region}/videos/${nextVideoUid}`}>
            <img
              className="next-icon arrow-icon"
              src={require("../../assets/images/next.svg")}
            />
          </Link>
        )}
        <div className="content">
          <div className="item-video-container">
            <img
              onClick={() => onChangeSound()}
              className="icon-sound"
              src={
                isMute
                  ? require("../../assets/images/mute.svg")
                  : require("../../assets/images/sound.svg")
              }
            />
            <div
              onClick={() => onChangePlay()}
              className="icon-play"
              style={{
                backgroundImage: `url(${require("../../assets/images/play_icon.svg")})`,
                opacity: isPlay ? 0 : 1
              }}
            />
            <video
              ref={el => (videoElement = el)}
              className="video-show"
              muted={isMute}
              autoPlay
              loop
              src={currentVideo.video.play_addr.url_list[0]}
            />
          </div>
          <ListComment currentVideo={currentVideo} />
        </div>
        <Link
          onClick={() => onCloseDetail()}
          to={`/${getCurrentRegion().code}`}
          className="icon-close"
          style={{
            backgroundImage: `url(${require("../../assets/images/close.svg")})`
          }}
        />
      </div>
    )
  );
};
export default VideodetailComponent;
