import * as ActionType from "./constants";
import { api } from "utils/apiUtil";

export const actListUser = (tuKhoa = "") => {
  return (dispatch) => {
    dispatch(actListUserRequest);
    if (tuKhoa.trim() != "") {
      api
        .get(
          `QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP01&tuKhoa=${tuKhoa}`
        )
        .then((result) => {
          dispatch(actListUserSuccess(result.data.content));
        })
        .catch((error) => {
          dispatch(actListUserFailed(error));
        });
    }
    api
      .get("QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP01")
      .then((result) => {
        dispatch(actListUserSuccess(result.data.content));
      })
      .catch((error) => {
        dispatch(actListUserFailed(error));
      });
  };
};

const actListUserRequest = () => {
  return {
    type: ActionType.LIST_USER_REQUEST,
  };
};

const actListUserSuccess = (data) => {
  return {
    type: ActionType.LIST_USER_SUCCESS,
    payload: data,
  };
};
const actListUserFailed = (data) => {
  return {
    type: ActionType.LIST_USER_FAILED,
    payload: data,
  };
};
