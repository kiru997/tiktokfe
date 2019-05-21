import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { getCurrentRegion } from "../../actions/region";
import {
  formatHeartCount,
  debounce,
  getPercentScrollOfElement
} from "../../actions/lodash";
import { actgetListCommentRequest } from "../../actions/tiktok";
import { COUNT_FETCH_DEFAULT_COMMENT } from "../../constants/cursor";

const showComment = (listComment, regionCode) => {
  if (listComment && listComment.length > 0) {
    return listComment.map((item, index) => {
      return (
        item && (
          <div key={index} className="video-comment-item">
            <span
              className="avatar-comment-item"
              style={{
                backgroundImage: `url(${item.user.avatar_thumb.url_list[0]})`
              }}
            />
            <div className="user-comment-item">
              <Link
                to={`/${regionCode}/users/${item.user.uid}`}
                className="user-comment-name"
              >
                {item.user.nickname}
              </Link>
              <div className="comment-item-content">{item.text}</div>
            </div>
          </div>
        )
      );
    });
  }
};
const ListComment = props => {
  const regionCode = getCurrentRegion().code;
  const { currentVideo } = props;
  const [listComment, setListComment] = useState([]);
  const [cursorComment, setCursorComment] = useState(0);
  const [positionScroll, setPositionScroll] = useState(0);
  const fetchListComment = async (
    regionCode,
    aweme_id,
    cursor,
    count,
    isMore = true
  ) => {
    let result = await actgetListCommentRequest(
      regionCode,
      aweme_id,
      cursor,
      count
    );
    result && result.length > 0
      ? isMore
        ? setListComment(listComment.concat(result)) &&
          setCursorComment(cursorComment + COUNT_FETCH_DEFAULT_COMMENT)
        : setListComment(result)
      : setListComment([]);
  };
  const updateCommentList = debounce(position => {
    fetchListComment(
      regionCode,
      currentVideo.aweme_id,
      cursorComment,
      COUNT_FETCH_DEFAULT_COMMENT
    );
    setPositionScroll(position);
  }, 1000);
  const onScrollComment = e => {
    if (getPercentScrollOfElement(e) > 90) {
      if (e.target.scrollTop > positionScroll) {
        updateCommentList(e.target.scrollTop);
      }
    }
  };

  useEffect(() => {
    fetchListComment(
      regionCode,
      currentVideo.aweme_id,
      cursorComment,
      COUNT_FETCH_DEFAULT_COMMENT,
      false
    );
  }, [currentVideo.aweme_id]);
  return (
    Object.keys(currentVideo).length !== 0 && (
      <div className="comment-container">
        <div className="comment-content">
          <Link
            to={`/${regionCode}/users/${currentVideo.author.uid}`}
            className="user-info"
          >
            <span
              style={{
                backgroundImage: `url(${
                  currentVideo.author.avatar_thumb.url_list[0]
                })`
              }}
              className="user-avatar"
            />
            <div className="user-name-content">
              <p className="user-name">{currentVideo.author.nickname}</p>
              <p className="user-nickname">@{currentVideo.author.unique_id}</p>
            </div>
          </Link>
          <div className="comment-box" onScroll={e => onScrollComment(e)}>
            <div className="video-comment-info">
              <h1 className="video-comment-info-title">
                <span>{currentVideo.desc}</span>
              </h1>
              <div className="video-music-info">
                <a
                  className="music-url"
                  href={currentVideo.music.play_url.url_list[0]}
                >
                  #{currentVideo.music.title}
                </a>
              </div>
              <div>
                {formatHeartCount(currentVideo.statistics.digg_count)} likes ·{" "}
                {formatHeartCount(currentVideo.statistics.comment_count)}{" "}
                comments
              </div>
            </div>
            {null}
            {showComment(listComment, regionCode)}
            {null}
          </div>
        </div>
      </div>
    )
  );
};
export default ListComment;
