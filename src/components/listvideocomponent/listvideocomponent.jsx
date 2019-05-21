import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import GlobalContext from "../../context/GlobalContext";
import { formatHeartCount } from "../../actions/lodash";
import showImages from "./showImages.jsx";
const ListvideoComponent = props => {
  const params = props.match.params;
  const context = useContext(GlobalContext);
  const {
    region,
    loading,
    listVideo,
    actFetchListVideo,
    actgetListUserVideo,
    actSetLoadMore
  } = context;
  const [isMute, setIsMute] = useState(true);

  const onChangeSound = () => {
    setIsMute(!isMute);
  };
  useEffect(() => {
    if (Object.keys(params).length == 0 || (params.region && !params.userUid)) {
      actFetchListVideo(region, false);
      actSetLoadMore(true);
    } else if (params && params.userUid) {
      actgetListUserVideo(params.userUid, region);
      actSetLoadMore(false);
    }
  }, [region]);
  return (
    listVideo.length > 0 && (
      <div className="video-container">
        <div className="show-video">
          <div className="feed-video-item">
            <div className="item-container">
              <img
                onClick={() => onChangeSound()}
                className="icon-sound"
                src={
                  isMute
                    ? require("../../assets/images/mute.svg")
                    : require("../../assets/images/sound.svg")
                }
              />
              <video
                className="video-show"
                autoPlay
                muted={isMute}
                loop
                src={listVideo[0].video.play_addr.url_list[0]}
              />
              <Link
                to={`/${region}/videos/${listVideo[0].aweme_id}`}
                className="image-play"
              />
              <div className="info-character">
                <span
                  className="avatar-character character"
                  style={{
                    backgroundImage: `url(${
                      listVideo[0].author.avatar_thumb.url_list[0]
                    })`
                  }}
                />
                <span className="heart-character character">
                  <img src={require("../../assets/images/heart.svg")} />
                  {formatHeartCount(listVideo[0].statistics.digg_count)}
                </span>
              </div>
            </div>
          </div>
          {showImages(listVideo, formatHeartCount, region)}
          <div style={{ clear: "both" }} />
          {loading && (
            <div className="_scroll_load_more_loading">
              <div className="tiktok-loading" />
            </div>
          )}
        </div>
      </div>
    )
  );
};
export default ListvideoComponent;
