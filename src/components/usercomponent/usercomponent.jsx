import React, { useEffect, useContext } from "react";
import GlobalContext from "../../context/GlobalContext";
import { getCurrentRegion } from "../../actions/region";
import { formatHeartCount } from "../../actions/lodash";

const UserComponent = props => {
  const userIdProps = props.match.params.userUid;
  const context = useContext(GlobalContext);
  const { user, actGetUserInfo } = context;

  useEffect(() => {
    actGetUserInfo(userIdProps, getCurrentRegion().code);
  }, []);
  let userImage =
    user && user.avatar_thumb ? user.avatar_thumb.url_list[0] : "";
  return (
    Object.keys(user).length > 0 && (
      <div className="user-detail-container">
        <div className="user-detail-content">
          <div
            className="user-avatar"
            style={{
              backgroundImage: `url(${userImage})`
            }}
          />
          <div className="user-detail">
            <h1>{user.nickname}</h1>
            <div className="user-uniqueid">
              @{formatHeartCount(user.unique_id)}
            </div>
            <div className="user-count-info">
              <span className="_user_header_number">
                {formatHeartCount(user.following_count)}
              </span>
              <span className="_user_header_unit">following</span>
              <span className="_user_header_point">,</span>
              <span className="_user_header_number">
                {formatHeartCount(user.follower_count)}
              </span>
              <span className="_user_header_unit">fans</span>
              <span className="_user_header_point">,</span>
              <span className="_user_header_number">
                {formatHeartCount(user.total_favorited)}
              </span>
              <span className="_user_header_unit">hearts</span>
            </div>
          </div>
        </div>
      </div>
    )
  );
};
export default UserComponent;
