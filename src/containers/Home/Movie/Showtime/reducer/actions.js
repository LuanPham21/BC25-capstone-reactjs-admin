import * as ActionType from "./constants";
import { api } from "utils/apiUtil";

const actGetCumRap = (id) => {
  return (dispatch) => {
    dispatch(actCumRapRequest());

    api
      .get(`QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${id}`)
      .then((res) => dispatch(actCumRapSuccess(res.data.content)))
      .catch((err) => dispatch(actCumRapFailed(err)));
  };
};

const actGetHeThongRap = () => {
  return (dispatch) => {
    dispatch(actHeThongRapRequest());

    api
      .get("QuanLyRap/LayThongTinHeThongRap")
      .then((res) => dispatch(actHeThongRapSuccess(res.data.content)))
      .catch((err) => dispatch(actHeThongRapFailed(err)));
  };
};

const actGetTaoLichChieu = (data) => {
  return (dispatch) => {
    dispatch(actTaoLichChieuRequest());

    api
      .post("QuanLyDatVe/TaoLichChieu", data)
      .then((res) => dispatch(actTaoLichChieuSuccess(res.data)))
      .catch((err) => dispatch(actTaoLichChieuFailed(err)));
  };
};

const actCumRapRequest = () => {
  return {
    type: ActionType.CUM_RAP_REQUEST,
  };
};

const actCumRapSuccess = (data) => {
  return {
    type: ActionType.CUM_RAP_SUCCESS,
    payload: data,
  };
};

const actCumRapFailed = (error) => {
  return {
    type: ActionType.CUM_RAP_FAILED,
    payload: error,
  };
};

const actHeThongRapRequest = () => {
  return {
    type: ActionType.HE_THONG_RAP_REQUEST,
  };
};

const actHeThongRapSuccess = (data) => {
  return {
    type: ActionType.HE_THONG_RAP_SUCCESS,
    payload: data,
  };
};

const actHeThongRapFailed = (error) => {
  return {
    type: ActionType.HE_THONG_RAP_FAILED,
    payload: error,
  };
};

const actTaoLichChieuRequest = () => {
  return {
    type: ActionType.TAO_LICH_CHIEU_REQUEST,
  };
};

const actTaoLichChieuSuccess = (data) => {
  return {
    type: ActionType.TAO_LICH_CHIEU_SUCCESS,
    payload: data,
  };
};

const actTaoLichChieuFailed = (error) => {
  return {
    type: ActionType.TAO_LICH_CHIEU_FAILED,
    payload: error,
  };
};

export { actGetCumRap, actGetHeThongRap, actGetTaoLichChieu };
