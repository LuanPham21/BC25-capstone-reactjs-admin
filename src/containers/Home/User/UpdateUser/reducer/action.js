import * as ActionType from "./constants";
import { api } from "utils/apiUtil";

const actUpdateUser = (user, navigate) => {
  return (dispatch) => {
    dispatch(actUpdateUserRequest);
    api
      .post("QuanLyNguoiDung/CapNhatThongTinNguoiDung", user)
      .then((result) => {
        dispatch(actUpdateUserSuccess(result.data.content));

        alert("Cập nhật người dùng thành công");

        //Redirect to /admin
        navigate("/user", { replace: true });
      })
      .catch((error) => {
        dispatch(actUpdateUserFailed(error));
      });
  };
};

const actGetUser = (id) => {
  return (dispatch) => {
    dispatch(actGetUserRequest);
    api
      .post(`QuanLyNguoiDung/LayThongTinNguoiDung?taiKhoan=${id}`)
      .then((result) => {
        dispatch(actGetUserSuccess(result.data.content));
      })
      .catch((error) => {
        dispatch(actGetUserFailed(error));
      });
  };
};

export const actUpdateUserRequest = () => {
  return {
    type: ActionType.UPDATE_USER_REQUEST,
  };
};

export const actUpdateUserSuccess = (data) => {
  return {
    type: ActionType.UPDATE_USER_SUCCESS,
    payload: data,
  };
};

export const actUpdateUserFailed = (data) => {
  return {
    type: ActionType.UPDATE_USER_FAILED,
    payload: data,
  };
};

export const actGetUserRequest = () => {
  return {
    type: ActionType.GET_USER_REQUEST,
  };
};

export const actGetUserSuccess = (data) => {
  return {
    type: ActionType.GET_USER_SUCCESS,
    payload: data,
  };
};

export const actGetUserFailed = (data) => {
  return {
    type: ActionType.GET_USER_FAILED,
    payload: data,
  };
};

export { actUpdateUser, actGetUser };
