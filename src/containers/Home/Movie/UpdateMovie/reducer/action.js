import * as ActionType from "./constants";
import { api } from "utils/apiUtil";

const actUpdateMovie = (movie, navigate) => {
  return (dispatch) => {
    dispatch(actUpdateMovieRequest);
    api
      .post("QuanLyPhim/CapNhatPhimUpload", movie)
      .then((result) => {
        dispatch(actUpdateMovieSuccess(result.data.content));

        alert("Cập nhật movie thành công");

        //Redirect to /admin
        navigate("/movie", { replace: true });
      })
      .catch((error) => {
        dispatch(actUpdateMovieFailed(error));
      });
  };
};

const actGetMovie = (id) => {
  return (dispatch) => {
    dispatch(actGetMovieRequest);
    api
      .get(`QuanLyPhim/LayThongTinPhim?MaPhim=${id}`)
      .then((result) => {
        dispatch(actGetMovieSuccess(result.data.content));
      })
      .catch((error) => {
        dispatch(actGetMovieFailed(error));
      });
  };
};

export const actUpdateMovieRequest = () => {
  return {
    type: ActionType.UPDATE_MOVIE_REQUEST,
  };
};

export const actUpdateMovieSuccess = (data) => {
  return {
    type: ActionType.UPDATE_MOVIE_SUCCESS,
    payload: data,
  };
};

export const actUpdateMovieFailed = (data) => {
  return {
    type: ActionType.UPDATE_MOVIE_FAILED,
    payload: data,
  };
};

export const actGetMovieRequest = () => {
  return {
    type: ActionType.GET_MOVIE_REQUEST,
  };
};

export const actGetMovieSuccess = (data) => {
  return {
    type: ActionType.GET_MOVIE_SUCCESS,
    payload: data,
  };
};

export const actGetMovieFailed = (data) => {
  return {
    type: ActionType.GET_MOVIE_FAILED,
    payload: data,
  };
};

export { actGetMovie, actUpdateMovie };
