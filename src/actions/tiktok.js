import callApi from "../untils/callApi";
import * as ActionTypes from "../constants/actionTypes";
export const actgetListCommentRequest = async (region, aweme_id = "", cursor = 0, count = 20) => {
    return await callApi(
        "listComments",
        "POST", {}, {
            region,
            aweme_id,
            cursor,
            count
        }
    );
};
export const actgetListVideoRequest = (dispatch, region, isLoadMore) => {
    return callApi(
        "listForYouFeed",
        "POST", {}, {
            region
        }
    ).then(res => {
        !isLoadMore ? actGetNewList(dispatch, res) : actGetMoreList(dispatch, res);
    });
};
const actGetNewList = (dispatch, listVideo) => {
    dispatch({
        type: ActionTypes.FETCH_NEW_LIST_VIDEO,
        listVideo
    });
};
const actGetMoreList = (dispatch, listVideo) => {
    dispatch({
        type: ActionTypes.FETCH_MORE_VIDEO,
        listVideo
    });
};
export const actgetListUserVideoRequest = (dispacth, userUid, region) => {
    return callApi(
        "listVideoOfUser",
        "POST", {}, {
            region,
            userUid
        }
    ).then(res => actgetListUserVideo(dispacth, res))
};
const actgetListUserVideo = (dispacth, listVideo) => {
    dispacth({
        type: ActionTypes.FETCH_LIST_USER_VIDEO,
        listVideo
    })
}

export const actgetUserInfoRequest = (dispatch, userUid, region) => {
    return callApi(
        "userDetail",
        "POST", {}, {
            userUid,
            region
        }
    ).then(res => actGetUserInfo(dispatch, res));
};
const actGetUserInfo = (dispatch, user) => {
    dispatch({
        type: ActionTypes.GET_USER_INFO,
        user
    })
}
export const actSetLoadMoreRequest = (dispatch, isLoadMore) => {
    return actSetLoadMore(dispatch, isLoadMore)
};
const actSetLoadMore = (dispatch, isLoadMore) => {
    dispatch({
        type: ActionTypes.SET_LOAD_MORE_VIDEO,
        isLoadMore
    })
}
