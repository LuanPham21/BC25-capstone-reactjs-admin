import * as ActionType from "./constants";
import { api } from "utils/apiUtil";

const actListMovie = (tenPhim = "") => {
  return (dispatch) => {
    dispatch(actListMovieRequest);
    if (tenPhim.trim() != "") {
      api
        .get(`QuanLyPhim/LayDanhSachPhim?maNhom=GP01&tenPhim=${tenPhim}`)
        .then((result) => {
          dispatch(actListMovieSuccess(result.data.content));
        })
        .catch((error) => {
          dispatch(actListMovieFailed(error));
        });
    }
    api
      .get("QuanLyPhim/LayDanhSachPhim?maNhom=GP01")
      .then((result) => {
        dispatch(actListMovieSuccess(result.data.content));
      })
      .catch((error) => {
        dispatch(actListMovieFailed(error));
      });
  };
};

const actDeleteMovie = (id) => {
  return (dispatch) => {
    dispatch(actDeleteMovieRequest);
    api
      .delete(`QuanLyPhim/XoaPhim?MaPhim=${id}`)
      .then((result) => {
        dispatch(actDeleteMovieSuccess(result.data.content));
        alert("Xoá phim thành công");
      })
      .catch((error) => {
        dispatch(actDeleteMovieFailed(error));
      });
  };
};

const actListMovieRequest = () => {
  return {
    type: ActionType.LIST_MOVIE_REQUEST,
  };
};

const actListMovieSuccess = (data) => {
  return {
    type: ActionType.LIST_MOVIE_SUCCESS,
    payload: data,
  };
};
const actListMovieFailed = (data) => {
  return {
    type: ActionType.LIST_MOVIE_FAILED,
    payload: data,
  };
};

export const actDeleteMovieRequest = () => {
  return {
    type: ActionType.DELETE_MOVIE_REQUEST,
  };
};

export const actDeleteMovieSuccess = (data) => {
  return {
    type: ActionType.DELETE_MOVIE_SUCCESS,
    payload: data,
  };
};

export const actDeleteMovieFailed = (data) => {
  return {
    type: ActionType.DELETE_MOVIE_FAILED,
    payload: data,
  };
};

export { actListMovie, actDeleteMovie };
