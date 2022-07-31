import * as ActionType from "./constants";
import { api } from "utils/apiUtil";

export const actLogin = (user, navigate) => {
  return (dispatch) => {
    dispatch(actLoginAuthRequest);
    api
      .post("QuanLyNguoiDung/DangNhap", user)
      .then((result) => {
        dispatch(actLoginAuthSuccess(result.data.content));

        //Lưu thông tin user xuống locaStorage
        localStorage.setItem("UserAdmin", JSON.stringify(result.data.content));

        alert("Đăng nhập thành công");

        // Redirect to /admin
        navigate("/", { replace: true });
      })
      .catch((error) => {
        dispatch(actLoginAuthFailed(error));
      });
  };
};

export const actLoginAuthRequest = () => {
  return {
    type: ActionType.LOGIN_AUTH_REQUEST,
  };
};

export const actLoginAuthSuccess = (data) => {
  return {
    type: ActionType.LOGIN_AUTH_SUCCESS,
    payload: data,
  };
};

export const actLoginAuthFailed = (data) => {
  return {
    type: ActionType.LOGIN_AUTH_FAILED,
    payload: data,
  };
};
