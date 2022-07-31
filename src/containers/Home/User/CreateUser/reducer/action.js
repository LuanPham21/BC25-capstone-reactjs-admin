import * as ActionType from "./constants";
import { api } from "utils/apiUtil";

export const actCreateUser = (user, navigate) => {
  return (dispatch) => {
    dispatch(actCreateUserRequest);
    api
      .post("QuanLyNguoiDung/ThemNguoiDung", user)
      .then((result) => {
        dispatch(actCreateUserSuccess(result.data.content));

        alert("Tạo tài khoản thành công");

        //Redirect to /admin
        navigate("/user", { replace: true });
      })
      .catch((error) => {
        dispatch(actCreateUserFailed(error));
      });
  };
};

export const actCreateUserRequest = () => {
  return {
    type: ActionType.CREATE_USER_REQUEST,
  };
};

export const actCreateUserSuccess = (data) => {
  return {
    type: ActionType.CREATE_USER_SUCCESS,
    payload: data,
  };
};

export const actCreateUserFailed = (data) => {
  return {
    type: ActionType.CREATE_USER_FAILED,
    payload: data,
  };
};
