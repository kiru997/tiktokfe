import React from 'react';
import {Link} from "react-router-dom";
const showImages = (listVideo,formatHeartCount,regionCode) => {
  listVideo = [...listVideo].splice(1, listVideo.length);
  return listVideo.map((item, index) => {
    return (
      <Link
        to={`/${regionCode}/videos/${item.aweme_id}`}
        key={index}
        className="feed-video-item"
      >
        <div
          className="item-container"
          style={{
            backgroundImage: `url(${item.video.cover.url_list[0]})`
          }}
        >
          <div className="image-play" />
          <div className="info-character">
            <span
              className="avatar-character character"
              style={{
                backgroundImage: `url(${item.author.avatar_thumb.url_list[0]})`
              }}
            />

            <span className="heart-character character">
              <img src={require("../../assets/images/heart.svg")} />
              {formatHeartCount(item.statistics.digg_count)}
            </span>
          </div>
        </div>
      </Link>
    );
  });
};
export default showImages;
